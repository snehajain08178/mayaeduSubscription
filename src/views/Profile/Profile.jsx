import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { CImg } from '@coreui/react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { fetchCard } from '../../redux/actions/card';
import { fetchUserDetails } from '../../redux/actions/userDetails';
import { fetchSubscription } from '../../redux/actions/subscription';
import { notify } from '../../redux/actions/notification';
import endpoints from '../../routes/endpoints';
import { SpinnerWithOverLay } from '../../components/Spinner/SpinnerWithOverlay';

import './profile.scss';
import ContentWrap from '../../components/ContentWrap/ContentWrap';
import img from '../../assets/img';
import { deleteSubscription } from '../../api/subscription';

const basicPlanString = [
  'Unlimited patient diagnosis with AI Assiatance',
  'Clinical Cases with feedback everyday to prepare you for the unpredictable.',
  'Active Cases to help you improve diagnosis skills',
];

function Profile({
  fetchCard: fetchCardAction,
  fetchUserDetails: fetchUserDetailsAction,
  fetchSubscription: fetchSubscriptionAction,
  card,
  subscriptionDetails,
  userDetails,
  notify: notifyAction,
}) {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    fetchCardAction();
    fetchUserDetailsAction();
    fetchSubscriptionAction();
  }, []);

  const { email, name, country } = (userDetails && userDetails.info) || {};
  const { subscriptions = [] } =
    (subscriptionDetails && subscriptionDetails.info) || {};

  const { defaultCard } = (card && card.info) || {};
  const { card: cardDetails } = defaultCard || {};
  const {
    planType,
    planValue,
    status,
    startDate,
    endDate,
    planCurrency,
    planSession,
    subscriptionId,
    isCancel,
  } = (subscriptions && subscriptions.length && subscriptions[0]) || {};

  function handleDelete() {
    setLoading(true);
    deleteSubscription({
      subsId: [subscriptionId],
    }).then(() => {
      setLoading(false);
      notifyAction({
        isError: false,
        message: 'Subscription cancelled successfully',
      }).catch((err) => {
        notifyAction(err);
        setLoading(false);
      });
    });
  }

  return (
    <div className="w-100 h-100 Views__Profile">
      {isLoading && <SpinnerWithOverLay />}
      <div className="container h-100">
        <ContentWrap
          style={{ margin: '0 auto', width: '10%' }}
          isFetching={
            card.isFetching ||
            subscriptionDetails.isFetching ||
            userDetails.isFetching
          }
        >
          <div className="row flex-column pt-lg-5">
            <div className="col w-100">
              <h2 className="font-weight-bold">Profile</h2>
              <h5 className="Color-LightGray font-weight-bold">
                Purchased on 20/07/2021
              </h5>
            </div>
            <div className="col pt-lg-2">
              <div className="shadow p-3 bg-white rounded">
                <div className="row d-flex align-items-center">
                  <div className="col-md-2">
                    <h5 className="text-primary font-weight-bold">
                      Account Details
                    </h5>
                  </div>
                  <div className="col-md-10">
                    <h6>
                      <span className="text-primary font-weight-bold">
                        Name:{' '}
                      </span>
                      {name || 'NA'}
                    </h6>
                    <h6>
                      <span className="text-primary font-weight-bold">
                        Email:{' '}
                      </span>
                      {email || 'NA'}
                    </h6>
                    <h6>
                      <span className="text-primary font-weight-bold">
                        Country:{' '}
                      </span>
                      {(country && country.name) || 'NA'}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col pt-2">
              <div className="shadow p-3 bg-white rounded">
                <div className="row d-flex">
                  <div className="col-md-2 d-flex align-items-center">
                    <h5 className="text-primary font-weight-bold">
                      Subscription
                    </h5>
                  </div>
                  <div className="col-md-4 text-capitalize">
                    <h5 className="font-weight-bold Color-LightGray">
                      Plan Information:
                    </h5>
                    <h6>
                      <span className="text-primary font-weight-bold">
                        Plan Type:{' '}
                      </span>
                      {planType}
                    </h6>
                    <h6>
                      <span className="text-primary font-weight-bold">
                        Plan Value:{' '}
                      </span>
                      {planValue / 100}
                    </h6>
                    <h6>
                      <span className="text-primary font-weight-bold">
                        Status:{' '}
                      </span>
                      {status}
                    </h6>
                    <h6>
                      <span className="text-primary font-weight-bold">
                        Currency:{' '}
                      </span>
                      {planCurrency}
                    </h6>
                    <h6>
                      <span className="text-primary font-weight-bold">
                        Validitiy:{' '}
                      </span>
                      {'from '}
                      {moment(startDate).format('MM-DD-YYYY')}
                      {' to '}
                      {moment(endDate).format('MM-DD-YYYY')}
                    </h6>
                    <h6>
                      <span className="text-primary font-weight-bold">
                        Plan Session:{' '}
                      </span>
                      {planSession}
                    </h6>
                  </div>
                  <div className="col-md-4">
                    <h5 className="font-weight-bold Color-LightGray pt-md-0">
                      Plan Features
                    </h5>
                    {basicPlanString.map((data, index) => (
                      <h6 key={index * 2 + 1}>{data}</h6>
                    ))}
                  </div>
                  <div className="col-md-2 d-flex justify-content-center align-items-end flex-column text-white">
                    <Button color="primary" type="link" className="m-0">
                      <Link
                        to={endpoints.plans}
                        className="text-decoration-none text-white"
                      >
                        Upgrade
                      </Link>
                    </Button>
                    {!isCancel && (
                      <Button
                        color="secondary"
                        type="link"
                        className="m-0 mt-4"
                        onClick={handleDelete}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col pt-2">
              <div className="shadow p-3 bg-white rounded">
                <div className="row d-flex align-items-center">
                  <div className="col-md-2">
                    <h5 className="text-primary font-weight-bold">
                      Payment Method
                    </h5>
                  </div>
                  <div className="col-md-8 text-capitalize">
                    <h5 className="font-weight-bold Color-LightGray">
                      {(cardDetails && cardDetails.funding) || 'Unknown'} Card:
                    </h5>
                    <h6>
                      XXXX XXXX XXXX {cardDetails && cardDetails.last4}{' '}
                      <CImg
                        src={img.cardsIcon[cardDetails && cardDetails.brand]}
                        alt={cardDetails && cardDetails.brand}
                        width={40}
                        height={15}
                      />
                    </h6>
                    <h6>
                      Valid Till:{' '}
                      {(cardDetails && cardDetails.exp_month) || 'NA'}
                      {' / '}
                      {(cardDetails && cardDetails.exp_year) || 'NA'}
                    </h6>
                  </div>
                  <div className="col-md-2 d-flex justify-content-md-end justify-content-center align-items-center">
                    <Button color="primary text-white m-0">
                      <Link
                        to={endpoints.updateCard}
                        className="text-decoration-none text-white"
                      >
                        Update
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentWrap>
      </div>
    </div>
  );
}

Profile.propTypes = {
  fetchCard: PropTypes.func.isRequired,
  fetchSubscription: PropTypes.func.isRequired,
  fetchUserDetails: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  subscriptionDetails: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,
};
function mapStateToProps({ card, subscriptionDetails, userDetails }) {
  return { card, subscriptionDetails, userDetails };
}

export default connect(mapStateToProps, {
  fetchCard,
  fetchSubscription,
  fetchUserDetails,
  notify,
})(Profile);
