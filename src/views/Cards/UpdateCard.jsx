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
import withStripeProvider from './withStripeProvider';
import Form from './Form';
import { notify } from '../../redux/actions/notification';
import { deleteCard, updateCard } from '../../api/card';

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

const UpdateCard = ({
  fetchCard: fetchCardAction,
  card,
  notify: notifyAction,
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

  const handleSubmit = async (val) => {
    let pmId = null;
    if (!stripe || !elements) {
      return;
    }
    if (val.pmId === 'NEW_PM_ID') {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
      });
      pmId = paymentMethod.id;
    } else if (val.pmId) {
      pmId = val.pmId;
    } else {
      notifyAction();
    }

    updateCard({ pm: pmId })
      .then(() => {
        notifyAction({
          isError: false,
          message: 'Card updated successfully',
        });
      })
      .catch((err) => {
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
      <div className="container">
        <ContentWrap isFetching={isFetching} isError={isError}>
          <Form
            info={info}
            onSubmit={handleSubmit}
            options={options}
            initialValues={{ pmId: defaultCardPmId }}
            onDeleteClick={handleCardDeleteClick}
            isUpdate
          />
        </ContentWrap>
      </div>
    </div>
  );
};

UpdateCard.propTypes = {
  card: PropTypes.object.isRequired,
  fetchCard: PropTypes.func.isRequired,
  paymentId: PropTypes.string.isRequired,
  notify: PropTypes.func.isRequired,
};

function mapStateToProps({ card }) {
  return { card };
}

export default connect(mapStateToProps, { fetchCard, notify })(
  withStripeProvider(UpdateCard)
);
