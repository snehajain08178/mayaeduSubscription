import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CCardBody,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupPrepend,
  CRow,
  CImg
} from '@coreui/react';
import { Slide } from 'react-slideshow-image';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CForm from '../../components/Form';
import useForm from '../../common/hooks/form';
import { validateEmail } from '../../helpers/validators';
import {
  signIn,
  invalidEmailPassword,
  invalidEmail,
  helpsYouStudy,
  helpsYouStudy1,
  practiceDiagnosis,
  practiceDiagnosis1,
  clinicalCases,
  clinicalCases1,
  poweredByAi,
  poweredByAi1
} from '../../libs/strings';
import './login.scss';
import 'react-slideshow-image/dist/styles.css';
import SVG from '../../assets/img/svg';

const fieldNames = {
  EMAIL_ID: 'email',
  PASSWORD: 'password',
};

function handleChange(event, preValues) {
  const { name, value } = event.target || {};
  return { ...preValues, [name]: value };
}

const fields = {
  [fieldNames.EMAIL_ID]: {
    handleChange,
  },
  [fieldNames.PASSWORD]: {
    handleChange,
  }
};

function handleSubmit(values) {
  this.onSubmit(values);
}

function validate({ values = {} }) {
  const errors = {};
  if (!validateEmail(values[fieldNames.EMAIL_ID])) {
    errors[fieldNames.EMAIL_ID] = invalidEmail;
  }
  return errors;
}

function Form({ isProcessing, isError, ...restProps }) {
  const {
    values, errors, events,
  } = useForm({
    initialValues: {},
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind(restProps),
  });
  const {
    onBlur, onKeyUp, onChange, onSubmit
  } = events;
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [showError, setShowError] = useState(false);

  React.useEffect(() => {
    setShowError(isError);
  }, [isError]);

  return (
    <div className="Login__Form">
      <CContainer>
        <CRow className="justify-content-center row-eq-height" >
          <CCol sm="12" md="9" lg="7" xl="6" xxl="5"
            className="Card_View d-none d-xl-block Main_Card_View one" style={{
              backgroundColor: '#eddfe6'
            }}>
            <div>
              <Slide autoplay={true} indicators={true} arrows={false}>
                <div className="text-center">
                  <CImg
                    src={SVG.booksIcon}
                  />
                  <h1 className="mt-5 mb-3">{helpsYouStudy}</h1>
                  <p className="slideText">{helpsYouStudy1}</p>
                </div>
                <div className="text-center">
                  <CImg
                    src={SVG.practiceDiagnosisIcon}
                  />
                  <h1 className="mt-5 mb-3">{practiceDiagnosis}</h1>
                  <p className="slideText">{practiceDiagnosis1}</p>
                </div>
                <div className="text-center">
                  <CImg
                    src={SVG.clinicalCasesIcon}
                  />
                  <h1 className="mt-5 mb-3">{clinicalCases}</h1>
                  <p className="slideText">{clinicalCases1}</p>
                </div>
                <div className="text-center">
                  <CImg
                    src={SVG.aiIcon}
                  />
                  <h1 className="mt-5 mb-3">{poweredByAi}</h1>
                  <p className="slideText">{poweredByAi1}</p>
                </div>
              </Slide>
            </div>
          </CCol>
          <CCol sm="12" md="9" lg="7" xl="6" xxl="5" className="Card_View Main_Card_View two" style={{ backgroundColor: 'white' }}>
              <Card>
                <CCardBody>
                  <CForm style={{
                    display: 'flex', alignItems: 'space-between', flexDirection: 'column', justifyContent: 'space-between', height: '100%'
                  }}>
                    <h1 className="font-weight-bold pb-4 text-center">{signIn}</h1>
                    <p className="errorMessage">{showError ? invalidEmailPassword : '' }</p>
                    <CInputGroup className="my-4">
                      <CInputGroupPrepend>
                      </CInputGroupPrepend>
                      <Input
                        name={fieldNames.EMAIL_ID}
                        labelText="Email Id"
                        placeholder="Enter email id"
                        value={values[fieldNames.EMAIL_ID] || ''}
                        errorText={errors[fieldNames.EMAIL_ID]}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                        onChange={onChange}
                        disabled={isProcessing}
                        maxLength={100}
                        onFocus={() => {
                          setShowError(false);
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="my-4">
                      <CInputGroupPrepend>
                      </CInputGroupPrepend>
                      <Input
                        labelText="Password"
                        placeholder="Enter password"
                        name={fieldNames.PASSWORD}
                        value={values[fieldNames.PASSWORD] || ''}
                        errorText={errors[fieldNames.PASSWORD]}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                        onChange={onChange}
                        disabled={isProcessing}
                        maxLength={14}
                        icon={passwordVisibility ? 'viewPasswordSvgIcon' : 'hidePasswordSvgIcon'}
                        type={!passwordVisibility ? 'password' : ''}
                        setPasswordVisibility={() => setPasswordVisibility(!passwordVisibility)}
                        onFocus={() => {
                          setShowError(false);
                        }}
                      />
                      </CInputGroup>
                      {/* Will be used in future */}
                      {/* <CRow className="justify-content-end my-4">
                        <p className="font-weight-bold forgetPassword"><u>{forgetPassword}</u></p>
                      </CRow> */}
                      <CRow className="justify-content-center">
                        <Button
                          style={{
                            opacity: isProcessing || !(values[fieldNames.EMAIL_ID] &&
                            values[fieldNames.PASSWORD]) ? 0.5 : 1
                          }}
                          color="primary"
                          className="Button_Login"
                          onClick={onSubmit}
                          disabled={isProcessing || !(values[fieldNames.EMAIL_ID] &&
                            values[fieldNames.PASSWORD])}
                          >{signIn}
                        </Button>
                    </CRow>
                    </CForm>
                  </CCardBody>
                </Card>
            </CCol>
          </CRow>
        </CContainer>
      </div>
  );
}

Form.defaultProps = {
  isProcessing: false,
};

Form.propTypes = {
  isProcessing: PropTypes.bool,
  isError: PropTypes.bool
};

export default Form;
