import React, { useState, useEffect } from 'react';
import {
  CRow, CContainer, CCol, CInputGroup
} from '@coreui/react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SelectDrop from '../../components/SelectDrop/SelectDrop';
import withStaticSearchProvider from '../../common/hocs/multiSelects/withStaticSearchProvider';
import { countries } from '../../libs/constants';
import { fieldNames, fields, personTitle } from './formConfig';
import useForm from '../../common/hooks/form';
import { removeBlankFromObject, stringEllipisis } from '../../libs/common';
import { validateEmail, validateName, validateNumber } from '../../helpers/validators';
import { invalidEmail, invalidNumber, nameValidation } from '../../libs/strings';
import TextArea from '../../components/TextArea';
import notificationMessages from '../../libs/notificationMessages';
import PhoneInput from '../../components/Input/PhoneInput';

const CountryWithSearch = withStaticSearchProvider(countries, SelectDrop);

function validate({ values = {} }) {
  const errors = {};
  if (values[fieldNames.EMAIL] && !validateEmail(values[fieldNames.EMAIL])) {
    errors[fieldNames.EMAIL] = invalidEmail;
  }

  if (!validateName(values[fieldNames.NAME])) {
    errors[fieldNames.CONTACT_PERSON] = nameValidation;
  }

  if (!validateName(values[fieldNames.CONTACT_PERSON])) {
    errors[fieldNames.CONTACT_PERSON] = nameValidation;
  }

  if (!validateNumber(values[fieldNames.CONTACT_NUMBER])) {
    errors[fieldNames.CONTACT_NUMBER] = invalidNumber;
  }

  return errors;
}

function handleSubmit(values) {
  this.onSubmit(removeBlankFromObject({
    ...values,
    personTitle: values.personTitle.name,
    country: values.country.name,
  }));
}

export default function Form({ ...restProps }) {
  const [isNotifyError, setNotifyError] = useState(false);
  const { values, errors, events } = useForm({
    initialValues: {},
    handleSubmit: handleSubmit.bind({
      ...restProps,
    }),
    fields,
    validate: validate.bind(restProps),
  });

  const {
    onBlur, onKeyUp, onChange, onSubmit, onSelect
  } = events;

  function handleFormSubmit() {
    setNotifyError(true);
    onSubmit();
  }

  useEffect(() => {
    if (errors && Object.keys(errors).length && isNotifyError) {
      restProps.notify(notificationMessages.FILL_ALL_FIELD_CORRECTLY);
      setNotifyError(false);
    }
  }, [errors]);

  return (
    <div className="Contact__Us__Form">
      <CContainer>
        <CRow className="justify-content-center" style={{ margin: '120px 0 32px 0' }}>
        <CCol sm="12" md="9" lg="7" xl="6" xxl="5"
            className="Card_View">
          <h1 className="font-weight-bold text-center pb-4">Contact Us</h1>
          <CInputGroup className="my-4">
            <Input
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              onChange={onChange}
              value={values[fieldNames.NAME] || ''}
              labelText="University/Institution's Name*"
              name={fieldNames.NAME}
              errorText={errors[fieldNames.NAME]}
              maxLength={35}
              placeholder="Enter your institute's name"
            />
          </CInputGroup>
          <CInputGroup className="my-4">
            <SelectDrop
              labelText="Contact Person Title*"
              name={fieldNames.PERSON_TITLE}
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              selectedItem={values[fieldNames.PERSON_TITLE] || ''}
              errorText={errors[fieldNames.PERSON_TITLE]}
              maxLength={35}
              dropListValues={personTitle}
              id="title"
              onChangeSelect={onSelect(fieldNames.PERSON_TITLE)}
            />
          </CInputGroup>
          <CInputGroup className="my-4">
            <Input
              labelText="Contact Person Name*"
              name={fieldNames.CONTACT_PERSON}
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              onChange={onChange}
              value={values[fieldNames.CONTACT_PERSON] || ''}
              errorText={errors[fieldNames.CONTACT_PERSON]}
              maxLength={35}
              placeholder="Enter the name of contact person"
            />
          </CInputGroup>
          <CInputGroup className="my-4">
            <Input
              labelText="Email Id*"
              name={fieldNames.EMAIL}
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              onChange={onChange}
              value={values[fieldNames.EMAIL] || ''}
              errorText={errors[fieldNames.EMAIL]}
              maxLength={35}
              placeholder="Enter email ID here"
            />
          </CInputGroup>
          <CInputGroup className="my-4">
            <TextArea
              labelText="Address Line 1*"
              name={fieldNames.ADDRESS_1}
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              onChange={onChange}
              value={values[fieldNames.ADDRESS_1] || ''}
              errorText={errors[fieldNames.ADDRESS_1]}
              maxLength={35}
              placeholder="Enter your address"
            />
          </CInputGroup>
          <CInputGroup className="my-4">
            <TextArea
              labelText="Address Line 2"
              name={fieldNames.ADDRESS_2}
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              onChange={onChange}
              value={values[fieldNames.ADDRESS_2] || ''}
              errorText={errors[fieldNames.ADDRESS_2]}
              maxLength={35}
              placeholder="Enter your address"
            />
          </CInputGroup>
          <CInputGroup className="my-4">
            <Input
              labelText="Town/ City*"
              name={fieldNames.TOWN}
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              onChange={onChange}
              value={values[fieldNames.TOWN] || ''}
              errorText={errors[fieldNames.TOWN]}
              maxLength={35}
              placeholder="Enter the name of your city"
            />
          </CInputGroup>
          <CInputGroup className="my-4">
            <CountryWithSearch
              labelText="Country*"
              name={fieldNames.COUNTRY}
              id="country"
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              onChangeSelect={onSelect(fieldNames.COUNTRY)}
              selectedItem={
                stringEllipisis(values[fieldNames.COUNTRY], 40) || ''
              }
              errorText={errors[fieldNames.COUNTRY]}
              placeholder="Enter contact number"
            />
          </CInputGroup>
          <CInputGroup className="my-4">
            <PhoneInput
              labelText="Contact Number*"
              country={values[fieldNames.COUNTRY]
                && (values[fieldNames.COUNTRY].code).toLowerCase()}
              disableDropdown
              name={fieldNames.CONTACT_NUMBER}
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              onChange={(val) => {
                onChange({ target: { name: fieldNames.CONTACT_NUMBER, value: val } });
              }}
              value={values[fieldNames.CONTACT_NUMBER] || ''}
              errorText={errors[fieldNames.CONTACT_NUMBER]}
              placeholder="Enter contact number"
            />
          </CInputGroup>
          <CInputGroup className="my-4">
            <TextArea
              labelText="Message"
              name={fieldNames.MESSAGE}
              placeholder="If you want to mention some other details"
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              onChange={onChange}
              value={values[fieldNames.MESSAGE] || ''}
              errorText={errors[fieldNames.MESSAGE]}
            />
          </CInputGroup>
          <CRow className="my-4 justify-content-center">
            <Button
              color="primary"
              className="Button"
              onClick={handleFormSubmit}
              disabled={
                restProps.isFetching ||
                !(
                  values[fieldNames.EMAIL] &&
                  values[fieldNames.NAME] &&
                  values[fieldNames.PERSON_TITLE] &&
                  values[fieldNames.CONTACT_PERSON] &&
                  values[fieldNames.CONTACT_NUMBER] &&
                  values[fieldNames.TOWN] &&
                  values[fieldNames.ADDRESS_1] &&
                  values[fieldNames.COUNTRY]
                )
              }
            >
              Submit
            </Button>
          </CRow>
        </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
