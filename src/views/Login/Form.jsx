import React, { useState } from 'react';
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
import { validateEmail } from '../../helpers/validators';
import { signIn, invalidEmailPassword } from '../../libs/strings';
import './login.scss';

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
    errors[fieldNames.EMAIL_ID] = invalidEmailPassword;
  }
  return errors;
}

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
    onBlur, onKeyUp, onChange, onSubmit
  } = events;
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div className="Login__Form">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol sm="12" md="9" lg="7" xl="6" xxl="5" className="Card_View">
            <CCardGroup>
              <Card>
                <CCardBody>
                  <CForm>
                  <h1 className="font-weight-bold pb-4">{signIn}</h1>
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
              </CCardGroup>
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
};

export default Form;
