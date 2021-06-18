import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import { CInputRadio } from '@coreui/react';
import List from './List';
import Button from '../../components/Button';
import useForm from '../../common/hooks/form';

const fieldNames = {
  PM_ID: 'pmId',
};

function handleChange(event, preValues) {
  const { name, value } = event.target || {};
  return { ...preValues, [name]: value };
}

const fields = {
  [fieldNames.PM_ID]: {
    handleChange,
  },
};

function handleSubmit(values) {
  this.onSubmit(values);
}

function validate() {
  const errors = {};
  return errors;
}

const Form = ({
  info, options, initialValues, ...restProps
}) => {
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const { values, events } = useForm({
    initialValues: initialValues || {},
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind(restProps),
  });

  const { onChange, onSubmit } = events;

  return (
    <div className="row shadow p-3 bg-white rounded">
      <div className="col-md-6">
        <List
          details={info}
          name={fieldNames.PM_ID}
          onChange={onChange}
          value={values[fieldNames.PM_ID]}
        />
      </div>
      <div className="col-md-6">
        <div className="row">
          <div
            type="button"
            className="container w-75 shadow-sm p-3 pointer d-flex"
            onClick={() => {
              setAddFormVisible(!isAddFormVisible);
            }}
          >
            <div className="col-8">
              <h6>Add Debit/Credit Card</h6>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <CInputRadio
                onChange={onChange}
                value="NEW_PM_ID"
                id="NEW_PM_ID"
                name={fieldNames.PM_ID}
              />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          {isAddFormVisible && (
            <div className="container w-75 shadow-sm p-3">
              <form onSubmit={onSubmit} className="flex-column d-flex">
                <label>
                  Card number
                  <CardNumberElement options={options} />
                </label>
                <label>
                  Expiration date
                  <CardExpiryElement options={options} />
                </label>
                <label>
                  CVC
                  <CardCvcElement />
                </label>
              </form>
            </div>
          )}
        </div>
        <div className="row w-100 mt-4">
          <div className="container w-75 d-flex justify-content-center">
            <Button color="primary" className="w-100" onClick={onSubmit}>
              Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Form.defaultProps = {
  initialValues: {},
};

Form.propTypes = {
  info: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default Form;
