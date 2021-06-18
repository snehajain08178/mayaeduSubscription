import React, { useMemo, useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { createSubscription } from '../../api/subscription';
import Button from '../../components/Button';

function useResponsiveFontSize() {
  const getFontSize = () => (window.innerWidth < 450 ? '16px' : '18px');
  const [fontSize, setFontSize] = useState(getFontSize);

  useEffect(() => {
    const onResize = () => {
      setFontSize(getFontSize());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return fontSize;
}

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: 'maroon',
          borderRadius: '30px',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4'
          },
          input: {
            borderRadius: '30px'
          }
        },
        invalid: {
          color: '#9e2146'
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const SplitForm = ({ paymentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });

    const payment = await createSubscription({
      planIds: [paymentId],
      pm: payload.paymentMethod.id,
    });

    console.log(payment, 'paymnet');

    const confirm = await stripe
      .confirmCardPayment(payment.body.data[0].latest_invoice.payment_intent.client_secret, {
        payment_method: payload.paymentMethod.id,
      })
      .then(() => {
      // Handle result.error or result.paymentIntent
      });
    console.log('[PaymentMethod]', payload, payment, confirm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-column d-flex">
      <label>
        Card number
        <CardNumberElement
          options={options}
          onReady={() => {
            console.log('CardNumberElement [ready]');
          }}
          onChange={(event) => {
            console.log('CardNumberElement [change]', event);
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]');
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]');
          }}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          options={options}
          onReady={() => {
            console.log('CardNumberElement [ready]');
          }}
          onChange={(event) => {
            console.log('CardNumberElement [change]', event);
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]');
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]');
          }}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          options={options}
          onReady={() => {
            console.log('CardNumberElement [ready]');
          }}
          onChange={(event) => {
            console.log('CardNumberElement [change]', event);
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]');
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]');
          }}
        />
      </label>
      <Button type="submit" color="primary" disabled={!stripe}>
        Pay
      </Button>
    </form>
  );
};

SplitForm.propTypes = {
  paymentId: PropTypes.string.isRequired,
};

export default SplitForm;
