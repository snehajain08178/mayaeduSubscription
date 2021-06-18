/* eslint-disable no-console */
/* eslint-disable indent */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  useStripe,
  useElements,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { fetchCard } from '../../redux/actions/card';
import ContentWrap from '../../components/ContentWrap';
import { createSubscription } from '../../api/subscription';
import withStripeProvider from './withStripeProvider';
import Form from './Form';
import { notify } from '../../redux/actions/notification';

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
            color: '#aab7c4',
          },
          input: {
            borderRadius: '30px',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const Cards = ({
  fetchCard: fetchCardAction, card, paymentId, notify: notifyAction
}) => {
  const { isFetching, isError, info } = card || {};
  const { defaultCard } = info || {};
  const { id: defaultCardPmId } = defaultCard || {};

  useEffect(() => {
    fetchCardAction();
  }, []);

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  function createPaymentMethodStripe() {
    stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    }).then((res) => (res.paymentMethod && res.paymentMethod.id))
      .catch((err) => {
        notifyAction(err);
      });
  }

  function confirmCardPayment(clientSecret, pmId) {
    stripe
      .confirmCardPayment(
        // payment.body.data[0].latest_invoice.payment_intent.client_secret,
        clientSecret,
        {
          payment_method: pmId,
        }
      )
      .then((result) => {
        console.log('result', result);
        if (result.status === 'succeeded') {
          console.log('confirm');
        } else {
          console.log('failure');
        }
      })
      .catch((error) => {
        console.log('error 3d handleRequiresAction', error.message);
        if (error.code !== 'cancelled') {
          console.log('faiure');
        } else {
          console.log(error.message);
        }
      });
  }

  const handleSubmit = (val) => {
    let pmId = null;
    if (!stripe || !elements) {
      return;
    }
    if (val.pmId === 'NEW_PM_ID') {
      pmId = createPaymentMethodStripe();
    } else if (val.pmId) {
      pmId = val.pmd;
    } else {
      notifyAction();
    }

    createSubscription({
      planIds: [paymentId],
      pm: pmId,
    }).then((res) => {
      const payment = res.body.data || {};
      if (payment[0].status === 'active') {
        console.log('payment success');
      } else if (payment[0].latest_invoice.payment_intent.status === 'requires_action') {
        confirmCardPayment(payment[0].latest_invoice.payment_intent.client_secret);
      } else if (payment[0].latest_invoice.payment_intent.status === 'requires_payment_method') {
        console.log('payment decline');
      }
    });
  };

  return (
    <div className="w-100">
      <div className="container">
        <ContentWrap isFetching={isFetching} isError={isError}>
          <Form
            info={info}
            onSubmit={handleSubmit}
            options={options}
            initialValues={{ pmId: defaultCardPmId }}
          />
        </ContentWrap>
      </div>
    </div>
  );
};

Cards.propTypes = {
  card: PropTypes.object.isRequired,
  fetchCard: PropTypes.func.isRequired,
  paymentId: PropTypes.string.isRequired,
  notify: PropTypes.func.isRequired,
};

function mapStateToProps({ card }) {
  return { card };
}

export default connect(mapStateToProps, { fetchCard, notify })(
  withStripeProvider(Cards)
);
