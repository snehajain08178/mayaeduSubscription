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
  if (!(values[fieldNames.EMAIL_ID])) {
    errors[fieldNames.EMAIL_ID] = 'Please enter required field';
  } else if (!validateEmail(values[fieldNames.EMAIL_ID])) {
    errors[fieldNames.EMAIL_ID] = 'Please enter valid email id';
  }
  if (!values[fieldNames.PASSWORD]) {
    errors[fieldNames.PASSWORD] = 'Please enter required field';
  } else if (!validatePassword(values[fieldNames.PASSWORD])) {
    errors[fieldNames.PASSWORD] = 'Please enter valid password';
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
                  <h1 className="text-center font-weight-bold">MayaEdu</h1>
                  <h5 className="text-center">For Medical Students</h5>
                    <p className="text-muted text-center">Sign In to your account</p>
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
                          maxLength={100}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                      </CInputGroupPrepend>
                      <Input
                        labelText="Password"
                        type="password"
                        placeholder="Enter password"
                        name={fieldNames.PASSWORD}
                        value={values[fieldNames.PASSWORD] || ''}
                        errorText={errors[fieldNames.PASSWORD]}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                        onChange={onChange}
                        disabled={isProcessing}
                        maxLength={14}
                      />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={onSubmit}
                            disabled={isProcessing}
                            >Login
                          </Button>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </CCol>
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
