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
import './form.scss';

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
    cardCvc: {},
  });
  const { values, events } = useForm({
    initialValues: initialValues || {},
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind(restProps),
  });

  const { onChange, onSubmit } = events;
  return (
    <div className="d-flex flex-sm-row flex-column p-3 rounded justify-content-between View_Main">
      <div className="col-12 col-md-5 View_Inner">
        <List
          details={info}
          name={fieldNames.PM_ID}
          onChange={onChange}
          value={values[fieldNames.PM_ID]}
          onDeleteClick={restProps.onDeleteClick}
        />
      </div>
      <div className="col-12 col-md-5 View_Inner">
        <div className="row">
          <div
            type="button"
            className="container w-75 shadow-sm p-3 pointer d-flex Width__Phablet--100 bg-white Border-radius"
            onClick={() => {
              setFormVisible(!isFormVisible);
            }}
          >
            <div className="col-10">
              <h6>Add Debit/Credit Card</h6>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <Radio
                onChange={onChange}
                value="NEW_PM_ID"
                id="NEW_PM_ID"
                checked={values[fieldNames.PM_ID] === 'NEW_PM_ID'}
                name={fieldNames.PM_ID}
              />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          {(isFormVisible || values[fieldNames.PM_ID] === 'NEW_PM_ID') && (
            <div className="container w-75 shadow-sm p-3 Width__Phablet--100 bg-white Border-radius">
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
                  <CardCvcElement options={options} onChange={(e) => {
                    setCardErrors({
                      ...cardErrors,
                      [e.elementType]: e,
                    });
                  }} />
                </label>
              </form>
            </div>
          )}
        </div>
        <div className="row w-100 mt-4 mx-auto">
          <div className="container w-50 d-flex justify-content-center Width__Phablet--100">
            <Button
              color="primary"
              className="w-100"
              onClick={onSubmit}
              disabled={
                values[fieldNames.PM_ID] === 'NEW_PM_ID' &&
                ((cardErrors.cardNumber &&
                !cardErrors.cardNumber.complete) ||
                (cardErrors.cardExpiry &&
                !cardErrors.cardExpiry.complete) ||
                (cardErrors.cardCvc &&
                !cardErrors.cardCvc.complete))
              }
            >
              {restProps.isUpdate ? (!info.defaultCard ? 'Add' : 'Update') : 'Pay'}
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
