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
  passwordFormat,
  uppercase,
  lowercase,
  numeric,
  minCharacters,
  specialChar,
  passwordMismatch,
  signup,
  passwordCreteriaStat,
  passwordNotMatched,
  acceptThe,
  termsAndConditions
} from '../../libs/strings';
import Modal from '../../components/Modal';
import TermAndConditions from '../../components/TermsAndConditions';
import withStaticSearchProvider from '../../common/hocs/multiSelects/withStaticSearchProvider';
import { stringEllipisis } from '../../libs/common';

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
  if ((values[fieldNames.CONTACT_INFO] && values[fieldNames.CONTACT_INFO] < 9)
    || ((!validateNumber(values[fieldNames.CONTACT_INFO])
    && (values[fieldNames.CONTACT_INFO].length > 1)))) {
    errors[fieldNames.CONTACT_INFO] = invalidNumber;
  }
  if (!(passwordCriteria.textLen && passwordCriteria.specialCharacter
      && passwordCriteria.upper && passwordCriteria.lower && passwordCriteria.number)) {
    errors[fieldNames.NEW_PASSWORD] = passwordFormat;
  }
  if (values[fieldNames.NEW_PASSWORD] !== values[fieldNames.CONFIRM_NEW_PASSWORD]) {
    errors[fieldNames.CONFIRM_NEW_PASSWORD] = passwordNotMatched;
  }
  return errors;
}

function CriteriaView(label, check = false) {
  return (
    <CCol>
      <CRow>
        <CImg
          src={check ? SVG.checkCircleIcon : SVG.uncheckCircleIcon}
        />
        <p className="pl-2">{label}</p>
      </CRow>
    </CCol>
  );
}

const CountryWithData = withStaticSearchProvider(countries, SelectDrop);

function Form({ isProcessing, ...restProps }) {
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
  const [passwordVisibility, setPasswordVisibility] = useState({
    newPassword: false,
    confirmNewPassword: false
  });
  const [visible, setVisible] = useState(false);

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
          <CCol sm="12" md="9" lg="7" xl="6" xxl="5" className="Card_View">
            <CCardGroup>
              <Card>
                <CCardBody>
                  <h1 className="font-weight-bold text-center">{signup}</h1>
                  <CForm>
                    <CInputGroup className="my-4">
                    <CountryWithData
                      id="Country"
                      labelText="Country*"
                      name={fieldNames.COUNTRY}
                      onBlur={onBlur}
                      onKeyUp={onKeyUp}
                      selectedItem={stringEllipisis(values[fieldNames.COUNTRY], 40) || ''}
                      onChangeSelect={onSelect(fieldNames.COUNTRY)}
                      value={values[fieldNames.COUNTRY] || ''}
                      errorText={errors[fieldNames.COUNTRY]}
                    />
                    </CInputGroup>
                    <CInputGroup className="my-4">
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
                        icon={'profileIcon'}
                      />
                    </CInputGroup>
                    <CInputGroup className="my-4">
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
                        icon={'CallIcon'}
                        maxLength={12}
                      />
                    </CInputGroup>
                    <CInputGroup className="my-4">
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
                        icon={'emailIcon'}
                        maxLength={100}
                      />
                    </CInputGroup>
                    <CInputGroup className="my-4">
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
                        icon={passwordVisibility.newPassword ? 'viewPasswordSvgIcon' : 'hidePasswordSvgIcon'}
                        type={!passwordVisibility.newPassword ? 'password' : ''}
                        setPasswordVisibility={() => setPasswordVisibility({
                          newPassword: !passwordVisibility.newPassword
                        })}
                      />
                    </CInputGroup>
                    <div className="my-4 Criteria">
                      <CRow className="my-2 font-weight-bold justify-content-center">{passwordCreteriaStat}</CRow>
                      <CRow className="ml-1 justify-content-between">
                        {(CriteriaView(uppercase, passwordCriteria.upper))}
                        {(CriteriaView(lowercase, passwordCriteria.lower))}
                      </CRow>
                      <CRow className="ml-1 justify-content-between">
                        {(CriteriaView(numeric, passwordCriteria.number))}
                        {(CriteriaView(minCharacters, passwordCriteria.textLen))}
                      </CRow>
                      <CRow className="ml-1 justify-content-between">
                        {(CriteriaView(specialChar, passwordCriteria.specialCharacter))}
                        {(CriteriaView(passwordMismatch,
                          values[fieldNames.NEW_PASSWORD] &&
                          values[fieldNames.NEW_PASSWORD] ===
                          values[fieldNames.CONFIRM_NEW_PASSWORD]))}
                      </CRow>
                      </div>
                    <CInputGroup className="my-4">
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
                        icon={passwordVisibility.confirmNewPassword ? 'viewPasswordSvgIcon' : 'hidePasswordSvgIcon'}
                        type={!passwordVisibility.confirmNewPassword ? 'password' : ''}
                        setPasswordVisibility={() => setPasswordVisibility({
                          confirmNewPassword: !passwordVisibility.confirmNewPassword
                        })}
                      />
                    </CInputGroup>
                    <CInputGroup className="my-4">
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
                        MultiSelectDrop
                        dropListValues={professionalCategory}
                      />
                    </CInputGroup>
                    <CRow
                      className="my-3 justify-content-center pt-4"
                    >
                      <CRow className="TermsAndConditions">
                        <CImg
                          src={termsAccepted ? SVG.checkSquareIcon : SVG.uncheckSquareIcon}
                          onClick={() => setTermsAccepted(!termsAccepted)}
                        />
                        <p className="pl-2" onClick={() => setVisible(true)}>{acceptThe}<u className="font-weight-bold pl-1" >{termsAndConditions}</u></p>
                      </CRow>
                    </CRow>
                    <CRow className="my-4 justify-content-center">
                      <Button
                        style={{
                          opacity: isProcessing || !(values[fieldNames.COUNTRY] &&
                            values[fieldNames.EMAIL] && values[fieldNames.FULL_NAME]
                            && values[fieldNames.NEW_PASSWORD] &&
                            values[fieldNames.CONFIRM_NEW_PASSWORD] && termsAccepted) ? 0.5 : 1
                        }}
                        color='primary'
                        className="Button__Signup"
                        onClick={onSubmit}
                        disabled={isProcessing || !(values[fieldNames.COUNTRY] &&
                        values[fieldNames.EMAIL] && values[fieldNames.FULL_NAME]
                        && values[fieldNames.NEW_PASSWORD] &&
                        values[fieldNames.CONFIRM_NEW_PASSWORD] && termsAccepted)}
                        >{signup}
                      </Button>
                      </CRow>
                  </CForm>
                </CCardBody>
              </Card>
            </CCardGroup>
          </CCol>
        </CRow>
        <Modal
          show={visible}
          onClose={() => setVisible(false)}
          title={termsAndConditions}
        >
          <TermAndConditions />
        </Modal>
      </CContainer>
    </div>
  );
}

Form.defaultProps = {
  isProcessing: false,
};

Form.propTypes = {
  isProcessing: PropTypes.bool,
};

export default Form;
