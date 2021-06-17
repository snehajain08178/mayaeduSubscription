import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupPrepend,
  CRow,
  CImg
} from '@coreui/react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CForm from '../../components/Form';
import useForm from '../../common/hooks/form';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateNumber,
  validateUpperCase,
  validateLowerCase,
  validateSpecialCharacters,
  validateNumberExist
} from '../../helpers/validators';
import SelectDrop from '../../components/SelectDrop/SelectDrop';
import { countries, professionalCategory } from '../../libs/constants';
import SVG from '../../assets/img/svg';
import './signup.scss';
import {
  invalidEmail,
  nameValidation,
  invalidNumber,
  passwordFormat
} from '../../libs/strings';

// TODO
// reponsive and styling
// Automatic login and free trial automatic hit
// Accept terms and conditionss mandatory
// Check signup validations from mayaedu
// Header import

let passwordCriteria = {
  upper: false,
  lower: false,
  number: false,
  specialCharacter: false,
  textLen: false,
};

const fieldNames = {
  EMAIL: 'email',
  FULL_NAME: 'name',
  CONTACT_INFO: 'mobileNumber',
  NEW_PASSWORD: 'password',
  CONFIRM_NEW_PASSWORD: 'confirmNewPassword',
  COUNTRY: 'country',
  PROFESSIONAL_DETAILS: 'profession',
};

function handleChange(event, preValues) {
  const { name, value } = event.target || {};
  return { ...preValues, [name]: value };
}

function handleSelect(event, preValues) {
  const { name, value } = event || {};
  return {
    ...preValues,
    [name]: name === fieldNames.COUNTRY ? { name: value.name, code: value.code } :
      name === fieldNames.PROFESSIONAL_DETAILS ? value.name : value
  };
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
  if (!validateEmail(values[fieldNames.EMAIL])) {
    errors[fieldNames.EMAIL] = invalidEmail;
  }
  if (!validateName(values[fieldNames.FULL_NAME])) {
    errors[fieldNames.FULL_NAME] = nameValidation;
  }
  if ((values[fieldNames.CONTACT_INFO] < 9)
    || ((!validateNumber(values[fieldNames.CONTACT_INFO])
    && (values[fieldNames.CONTACT_INFO].length > 1)))) {
    errors[fieldNames.CONTACT_INFO] = invalidNumber;
  }
  if (!(passwordCriteria.textLen && passwordCriteria.specialCharacter
      && passwordCriteria.upper && passwordCriteria.lower && passwordCriteria.number)) {
    errors[fieldNames.PASSWORD] = passwordFormat;
  }
  if (!validatePassword(values[fieldNames.CONFIRM_NEW_PASSWORD])) {
    errors[fieldNames.CONFIRM_NEW_PASSWORD] = passwordFormat;
  }
  return errors;
}

function CreteriaView(label, isTrue = false) {
  return (
    <div className="d-flex flex-row col-5 align-items-start">
      <CImg
        src={isTrue ? SVG.checkCircleIcon : SVG.uncheckCircleIcon}
      />
      <p>{label}</p>
    </div>
  );
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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

  const isPassCriteriaMatch = (text) => {
    let upper = false;
    let lower = false;
    let number = false;
    let specialCharacter = false;
    let textLen = false;
    if (validateUpperCase(text)) {
      upper = true;
    }
    if (validateLowerCase(text)) {
      lower = true;
    }
    if (validateNumberExist(text)) {
      number = true;
    }
    if (validateSpecialCharacters(text)) {
      specialCharacter = true;
    }
    if (text && text.length >= 8) {
      textLen = true;
    }
    passwordCriteria = {
      ...passwordCriteria, upper, lower, number, specialCharacter, textLen
    };
    setForceUpdate(!forceUpdate);
  };

  React.useEffect(() => {
    isPassCriteriaMatch(values[fieldNames.NEW_PASSWORD]);
  }, [values[fieldNames.NEW_PASSWORD]]);

  return (
    <div className="Signup_Form">
      <CContainer>
            <CRow className="justify-content-center">
              <CCol md="6" className="Card_View">
                <CCardGroup>
                  <Card className="p-4 Card_View">
                    <CCardBody>
                      <CForm>
                        <CInputGroup className="mb-3">
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
                        </CInputGroup>
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
                          <CRow>
                          {(CreteriaView('Uppercase', passwordCriteria.upper))}
                          {(CreteriaView('Lowercase', passwordCriteria.lower))}
                          </CRow>
                          <CRow>
                          {(CreteriaView('Numeric', passwordCriteria.number))}
                          {(CreteriaView('Min 8 characters', passwordCriteria.textLen))}
                          </CRow>
                          <CRow>
                          {(CreteriaView('Special character', passwordCriteria.specialCharacter))}
                          {(CreteriaView('Passwords must Match', values[fieldNames.NEW_PASSWORD] && values[fieldNames.NEW_PASSWORD] === values[fieldNames.CONFIRM_NEW_PASSWORD]))}
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
                        <CInputGroup className="mb-3">
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
                        </CInputGroup>
                        <div
                          className="d-flex flex-row justify-content-center"
                          onClick={() => setTermsAccepted(!termsAccepted)}
                        >
                          <CImg
                            src={termsAccepted ? SVG.checkSquareIcon : SVG.uncheckSquareIcon}
                          />
                          <p>Accept the Terms & Conditions</p>
                        </div>
                          <CRow className="justify-content-center">
                              <Button
                                color="primary"
                                className="px-4"
                                onClick={onSubmit}
                                disabled={isProcessing || !(values[fieldNames.COUNTRY] &&
                                  values[fieldNames.EMAIL] && values[fieldNames.FULL_NAME]
                                  && values[fieldNames.NEW_PASSWORD] &&
                                  values[fieldNames.CONFIRM_NEW_PASSWORD])}
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
