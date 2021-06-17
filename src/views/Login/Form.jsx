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
import { signIn, invalidEmailPassword, forgetPassword } from '../../libs/strings';
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
      <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <Card className="p-4">
                <CCardBody>
                  <CForm>
                  <h1 className="text-center font-weight-bold">{signIn}</h1>
                    <CInputGroup className="mb-3">
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
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
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
                        type={passwordVisibility ? 'password' : ''}
                        setPasswordVisibility={() => setPasswordVisibility(!passwordVisibility)}
                      />
                      </CInputGroup>
                      <CRow className="d-flex justify-content-end">
                        <p className="forgetPassword"><u>{forgetPassword}</u></p>
                      </CRow>
                      <CRow className="justify-content-center Button">
                        <Button
                          color="primary"
                          className="px-4"
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
