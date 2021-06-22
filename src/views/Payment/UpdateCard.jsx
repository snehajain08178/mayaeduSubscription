import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  useStripe,
  useElements,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import Icon from '@coreui/icons-react';
import { fetchCard } from '../../redux/actions/card';
import ContentWrap from '../../components/ContentWrap';
import withStripeProvider from './withStripeProvider';
import Form from './Form';
import { notify } from '../../redux/actions/notification';
import { deleteCard, updateCard } from '../../api/card';
import { SpinnerWithOverLay } from '../../components/Spinner/SpinnerWithOverlay';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import endpoints from '../../routes/endpoints';

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
      showIcon: true,
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
  history,
}) => {
  const [cardDeleteModal, setCardDeleteModal] = useState({
    isVisible: false,
    id: null
  });
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
      pmId = paymentMethod.id;
      setLoading(false);
    } else if (val.pmId) {
      pmId = val.pmId;
    } else {
      notifyAction();
    }
    setLoading(true);
    updateCard({ pm: pmId })
      .then(() => {
        setLoading(false);
        fetchCardAction();
        notifyAction({
          isError: false,
          message: 'Card updated successfully',
        });
      })
      .catch((err) => {
        notifyAction(err);
        setLoading(false);
      });
  };

  function handleDeleteModalConfirm() {
    setLoading(true);
    deleteCard({ fingerprint: cardDeleteModal.id })
      .then(() => {
        fetchCardAction();
        setLoading(false);
        setCardDeleteModal({
          isVisible: false,
          id: null
        });
        notifyAction({
          isError: false,
          message: 'Card deleted successfully',
        });
      })
      .catch((err) => {
        notifyAction(err);
        setLoading(false);
        setCardDeleteModal({
          isVisible: false,
          id: null
        });
      });
    setCardDeleteModal({
      isVisible: false,
      id: null
    });
  }

  function handleCardDeleteClick(delVal) {
    setCardDeleteModal({
      isVisible: true,
      id: delVal
    });
  }

  return (
    <div className="w-100">
      {isLoading && (<SpinnerWithOverLay />)}
      <div className="container">
        <ContentWrap isFetching={isFetching} isError={isError}>
          <div className="col w-100 pt-3 p-0 d-flex justify-content-between">
            <h2 className="font-weight-bold p-0 pt-2">Cards</h2>
            <div
                onClick={() => {
                  history.push(endpoints.profile);
                }}
                role="button"
              >
                <Icon
                  name="cil-x"
                  size="xl"
                  className="font-weight-bold mt-2"
                />
              </div>
          </div>
          <div className="col w-100">
            <Form
              info={info}
              onSubmit={handleSubmit}
              options={options}
              initialValues={{ pmId: defaultCardPmId || 'NEW_PM_ID' }}
              onDeleteClick={handleCardDeleteClick}
              isUpdate
            />
          </div>
        </ContentWrap>
        {
          cardDeleteModal.isVisible && (
            <ConfirmModal
              onSubmit={handleDeleteModalConfirm}
              isVisible={cardDeleteModal.isVisible}
              onCancel={() => {
                setCardDeleteModal({
                  isVisible: false,
                  id: null
                });
              }}
              content="Are you sure you want to delete this card?"
              submitLabel="Delete"
            />
          )
        }
      </div>
    </div>
  );
};

UpdateCard.propTypes = {
  card: PropTypes.object.isRequired,
  fetchCard: PropTypes.func.isRequired,
  paymentId: PropTypes.string.isRequired,
  notify: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps({ card }) {
  return { card };
}

export default connect(mapStateToProps, { fetchCard, notify })(
  withStripeProvider(UpdateCard)
);
