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
import { deleteCard } from '../../api/card';
import history from '../../libs/history';
import endpoints from '../../routes/endpoints';
import { SpinnerWithOverLay } from '../../components/Spinner/SpinnerWithOverlay';

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
  fetchCard: fetchCardAction,
  card,
  paymentId,
  notify: notifyAction,
}) => {
  const [isLoading, setLoading] = useState(false);
  const { isFetching, isError, info } = card || {};
  const { defaultCard } = info || {};
  const { id: defaultCardPmId } = defaultCard || {};

  useEffect(() => {
    fetchCardAction();
  }, []);

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  function confirmCardPayment(clientSecret, pmId) {
    setLoading(true);
    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: pmId,
      })
      .then((result) => {
        setLoading(false);
        if (result.paymentIntent.status === 'succeeded') {
          history.push(endpoints.profile);
          notifyAction({
            isError: false,
            message: 'Payment succeeded',
          });
        } else {
          notifyAction({
            isError: true,
            message: 'Payment Faliure',
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.code !== 'cancelled') {
          notifyAction({
            isError: true,
            message: 'Payment failure',
          });
        } else {
          notifyAction();
        }
      });
  }

  const handleSubmit = async (val) => {
    let pmId = null;
    if (!stripe || !elements) {
      return;
    }
    if (val.pmId === 'NEW_PM_ID') {
      setLoading(true);
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
      });
      setLoading(false);
      pmId = paymentMethod.id;
    } else if (val.pmId) {
      pmId = val.pmId;
    } else {
      notifyAction();
    }
    setLoading(true);
    createSubscription({
      planIds: [paymentId],
      pm: pmId,
    })
      .then((res) => {
        const payment = res.body.data || {};
        setLoading(false);
        if (payment[0].status === 'active') {
          fetchCardAction();
          notifyAction({ isError: false, message: 'Payment Success' });
          history.push(endpoints.profile);
        } else if (
          payment[0].latest_invoice.payment_intent.status === 'requires_action'
        ) {
          confirmCardPayment(
            payment[0].latest_invoice.payment_intent.client_secret
          );
        } else if (
          payment[0].latest_invoice.payment_intent.status ===
          'requires_payment_method'
        ) {
          notifyAction({
            isError: true,
            message: 'Payment decline',
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyAction(err);
      });
  };

  function handleCardDeleteClick(delVal) {
    deleteCard({ fingerprint: delVal })
      .then(() => {
        fetchCardAction();
        notifyAction({
          isError: false,
          message: 'Card deleted successfully',
        });
      })
      .catch((err) => {
        notifyAction(err);
      });
  }

  return (
    <div className="w-100">
      {isLoading && <SpinnerWithOverLay />}
      <div className="container">
        <ContentWrap isFetching={isFetching} isError={isError}>
          <div className="col w-100 p-0 pt-3">
            <h2 className="font-weight-bold p-0 pt-2">Payment</h2>
          </div>
          <div className="col w-100">
            <Form
              info={info}
              onSubmit={handleSubmit}
              options={options}
              initialValues={{ pmId: defaultCardPmId }}
              onDeleteClick={handleCardDeleteClick}
            />
          </div>
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
