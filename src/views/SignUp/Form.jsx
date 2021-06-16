import React from 'react';
import PropTypes from 'prop-types';
import {
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupPrepend,
  CRow
} from '@coreui/react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CForm from '../../components/Form';
import useForm from '../../common/hooks/form';
import { validateEmail, validatePassword } from '../../helpers/validators';
import SelectDrop from '../../components/SelectDrop/SelectDrop';
import { countries, professionalCategory } from '../../libs/constants';
// TODO
// onfocus colour baby purple
// reponsive
// Automatic login and free trial automatic hit

const fieldNames = {
  EMAIL: 'email',
  FULL_NAME: 'fullName',
  CONTACT_INFO: 'contactInfo',
  NEW_PASSWORD: 'newPassword',
  CONFIRM_NEW_PASSWORD: 'confirmNewPassword',
  COUNTRY: 'country',
  PROFESSIONAL_DETAILS: 'professionalDetails',
};

function handleChange(event, preValues) {
  const { name, value } = event.target || {};
  return { ...preValues, [name]: value };
}

function handleSelect(event, preValues) {
  const { name, value } = event || {};
  return { ...preValues, [name]: value };
}

const fields = {
  [fieldNames.EMAIL]: {
    handleChange,
  },
  [fieldNames.FULL_NAME]: {
    handleChange,
  },
  [fieldNames.CONTACT_INFO]: {
    handleChange,
  },
  [fieldNames.NEW_PASSWORD]: {
    handleChange,
  },
  [fieldNames.CONFIRM_NEW_PASSWORD]: {
    handleChange,
  },
  [fieldNames.COUNTRY]: {
    handleSelect,
  },
  [fieldNames.PROFESSIONAL_DETAILS]: {
    handleSelect,
  }
};

function handleSubmit(values) {
  this.onSubmit(values);
}

function validate({ values = {} }) {
  const errors = {};
  if (!(values[fieldNames.EMAIL])) {
    errors[fieldNames.EMAIL] = 'Please enter required field';
  } else if (!validateEmail(values[fieldNames.EMAIL])) {
    errors[fieldNames.EMAIL] = 'Please enter valid email id';
  }
  if (!(values[fieldNames.FULL_NAME])) {
    errors[fieldNames.FULL_NAME] = 'Please enter required field';
  }
  if (!(values[fieldNames.NEW_PASSWORD])) {
    errors[fieldNames.NEW_PASSWORD] = 'Please enter required field';
  } else if (!validatePassword(values[fieldNames.PASSWORD])) {
    errors[fieldNames.PASSWORD] = 'Please enter valid password';
  }
  if (!(values[fieldNames.CONFIRM_NEW_PASSWORD])) {
    errors[fieldNames.CONFIRM_NEW_PASSWORD] = 'Please enter required field';
  } else if (!validatePassword(values[fieldNames.PASSWORD])) {
    errors[fieldNames.PASSWORD] = 'Please enter valid password';
  }
  return errors;
}

function Form({ isReadonly, isProcessing, ...restProps }) {
  const {
    values, errors, events,
  } = useForm({
    initialValues: {},
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind(restProps),
  });

  const {
    onBlur, onKeyUp, onChange, onSubmit, onSelect
  } = events;

  return (
    <div className="Login__Form">
      <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <Card className="p-4">
                <CCardBody>
                  <CForm>
                    <div className="Field col-4">
                      <SelectDrop
                        id="Country"
                        labelText="Country*"
                        name={fieldNames.COUNTRY}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                        selectedItem={values[fieldNames.COUNTRY]}
                        onChangeSelect={onSelect(fieldNames.COUNTRY)}
                        value={values[fieldNames.COUNTRY] || ''}
                        errorText={errors[fieldNames.COUNTRY]}
                        isReadonly={isReadonly}
                        MultiSelectDrop
                        dropListValues={countries}
                      />
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                      </CInputGroupPrepend>
                      <Input
                        name={fieldNames.FULL_NAME}
                        labelText="Full Name*"
                        placeholder="Enter full name"
                        value={values[fieldNames.FULL_NAME] || ''}
                        errorText={errors[fieldNames.FULL_NAME]}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                          onChange={onChange}
                          disabled={isProcessing}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                      </CInputGroupPrepend>
                      <Input
                        name={fieldNames.CONTACT_INFO}
                        labelText="Contact info"
                        placeholder="Enter Contact no."
                        value={values[fieldNames.CONTACT_INFO] || ''}
                        errorText={errors[fieldNames.CONTACT_INFO]}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                          onChange={onChange}
                          disabled={isProcessing}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                      </CInputGroupPrepend>
                      <Input
                        name={fieldNames.EMAIL}
                        labelText="Email*"
                        placeholder="Enter Email"
                        value={values[fieldNames.EMAIL] || ''}
                        errorText={errors[fieldNames.EMAIL]}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                          onChange={onChange}
                          disabled={isProcessing}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                      </CInputGroupPrepend>
                      <Input
                        name={fieldNames.NEW_PASSWORD}
                        labelText="New Password*"
                        placeholder="Enter Password"
                        value={values[fieldNames.NEW_PASSWORD] || ''}
                        errorText={errors[fieldNames.NEW_PASSWORD]}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                          onChange={onChange}
                          disabled={isProcessing}
                      />
                    </CInputGroup>
                    <div>
                      <p className='text-center'>Password should meet following creteria: </p>
                      <CRow className="justify-content-between mx-auto">
                        <p>Uppercase</p>
                        <p>Lowercase</p>
                      </CRow>
                      <CRow className="justify-content-between mx-auto">
                        <p>Numeric</p>
                        <p>Min 8 characters</p>
                      </CRow>
                      <CRow className="justify-content-between mx-auto">
                        <p>Special character</p>
                        <p>Passwords must Match</p>
                      </CRow>
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                      </CInputGroupPrepend>
                      <Input
                        name={fieldNames.CONFIRM_NEW_PASSWORD}
                        labelText="Confirm New Password*"
                        placeholder="Enter Confirm Password"
                        value={values[fieldNames.CONFIRM_NEW_PASSWORD] || ''}
                        errorText={errors[fieldNames.CONFIRM_NEW_PASSWORD]}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                          onChange={onChange}
                          disabled={isProcessing}
                      />
                    </CInputGroup>
                    <div className="Field col-4">
                      <SelectDrop
                        id="ProfesionalDetails"
                        labelText="Professional Details"
                        name={fieldNames.PROFESSIONAL_DETAILS}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                        selectedItem={values[fieldNames.PROFESSIONAL_DETAILS]}
                        onChangeSelect={onSelect(fieldNames.PROFESSIONAL_DETAILS)}
                        value={values[fieldNames.PROFESSIONAL_DETAILS] || ''}
                        errorText={errors[fieldNames.PROFESSIONAL_DETAILS]}
                        isReadonly={isReadonly}
                        MultiSelectDrop
                        dropListValues={professionalCategory}
                      />
                    </div>
                    <p>Accept the Terms & Conditions</p>
                      <CRow className="justify-content-center">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={onSubmit}
                            disabled={isProcessing}
                            >SignUp
                          </Button>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </Card>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
}

Form.defaultProps = {
  isProcessing: false,
  isReadonly: false,
};

Form.propTypes = {
  isReadonly: PropTypes.bool,
  isProcessing: PropTypes.bool,
};

export default Form;
