import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import List from './List';
import Button from '../../components/Button';
import useForm from '../../common/hooks/form';
import Radio from '../../components/Radio/Radio';

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
  const [isFormVisible, setFormVisible] = useState(false);
  const [cardErrors, setCardErrors] = useState({
    cardNumber: {},
    cardExpiry: '',
  });
  const { values, events } = useForm({
    initialValues: initialValues || {},
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind(restProps),
  });

  const { onChange, onSubmit } = events;
  return (
    <div className="row shadow p-3 bg-white rounded">
      <div className="col-md-6 p-0 p-lg-2">
        <List
          details={info}
          name={fieldNames.PM_ID}
          onChange={onChange}
          value={values[fieldNames.PM_ID]}
          onDeleteClick={restProps.onDeleteClick}
        />
      </div>
      <div className="col-md-6">
        <div className="row">
          <div
            type="button"
            className="container w-75 shadow-sm p-3 pointer d-flex Width__Phablet--100"
          >
            <div className="col-10">
              <h6>Add Debit/Credit Card</h6>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <Radio
                onChange={onChange}
                onClick={() => {
                  setFormVisible(!isFormVisible);
                }}
                value="NEW_PM_ID"
                id="NEW_PM_ID"
                name={fieldNames.PM_ID}
              />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          {isFormVisible && (
            <div className="container w-75 shadow-sm p-3 Width__Phablet--100">
              <form onSubmit={onSubmit} className="flex-column d-flex">
                <label>
                  Card number
                  <CardNumberElement
                    options={options}
                    onChange={(e) => {
                      setCardErrors({
                        ...cardErrors,
                        [e.elementType]: e,
                      });
                    }}
                  />
                  {cardErrors.cardNumber && (
                    <div className="text-danger mt-2 font-xs">
                      {cardErrors.cardNumber &&
                        cardErrors.cardNumber.error &&
                        cardErrors.cardNumber.error.message}
                    </div>
                  )}
                </label>
                <label>
                  Expiry date
                  <CardExpiryElement
                    options={options}
                    onChange={(e) => {
                      setCardErrors({
                        ...cardErrors,
                        [e.elementType]: e,
                      });
                    }}
                  />
                  {cardErrors.cardNumber && (
                    <div className="text-danger mt-2 font-xs">
                      {cardErrors.cardExpiry &&
                        cardErrors.cardExpiry.error &&
                        cardErrors.cardExpiry.error.message}
                    </div>
                  )}
                </label>
                <label>
                  CVC
                  <CardCvcElement options={options} />
                </label>
              </form>
            </div>
          )}
        </div>
        <div className="row w-100 mt-4">
          <div className="container w-75 d-flex justify-content-center Width__Phablet--100">
            <Button color="primary" className="w-100" onClick={onSubmit}>
              {restProps.isUpdate ? 'Update' : 'Pay'}
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
