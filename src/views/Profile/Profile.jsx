import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { CImg, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { fetchCard } from '../../redux/actions/card';
import { fetchUserDetails } from '../../redux/actions/userDetails';
import { fetchSubscription } from '../../redux/actions/subscription';
import { notify } from '../../redux/actions/notification';
import endpoints from '../../routes/endpoints';
import { SpinnerWithOverLay } from '../../components/Spinner/SpinnerWithOverlay';
import svgImg from '../../assets/img/svg';
import Modal from '../../components/Modal';
import './profile.scss';
import ContentWrap from '../../components/ContentWrap/ContentWrap';
import img from '../../assets/img';
import { deleteSubscription } from '../../api/subscription';
import { getCardNumberFormat } from '../../helpers/collecionUtils';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { resetSignupDetails } from '../../redux/actions/auth';
import { subscriptionDateFormat } from '../../libs/common';

const basicPlanString = [
  'Unlimited patient diagnosis with AI assistance.',
  'Clinical Cases with feedback everyday to prepare you for the unpredictable.',
  'Study Material to help you prepare for the exams.',
  'Active Cases to help you improve your diagnostic skills.',
];

function Profile({
  fetchCard: fetchCardAction,
  fetchUserDetails: fetchUserDetailsAction,
  fetchSubscription: fetchSubscriptionAction,
  card,
  subscriptionDetails,
  userDetails,
  notify: notifyAction,
  auth,
  resetSignupDetails: resetSignup
}) {
  const [isLoading, setLoading] = useState(false);
  const [isSubscriptionDeleteModal, setSubscriptionDeleteModal] =
    useState(false);

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
    status,
    endDate,
    planCurrency,
    planSession,
    startDate,
    subscriptionId,
    isCancel,
  } = (subscriptions && subscriptions.length && subscriptions[0]) || {};
  const [showModal, setShowModal] = useState(false);

  function handleSubscriptionDeleteClick() {
    setLoading(true);
    deleteSubscription({
      subsId: [subscriptionId],
    }).then(() => {
      setLoading(false);
      setSubscriptionDeleteModal(false);
      fetchSubscriptionAction();
      notifyAction({
        isError: false,
        message: 'Subscription cancelled successfully',
      }).catch((err) => {
        notifyAction(err);
        setLoading(false);
        setSubscriptionDeleteModal(false);
      });
    });
    setLoading(true);
    setSubscriptionDeleteModal(false);
  }

  function handleDelete() {
    setSubscriptionDeleteModal(true);
  }

  React.useEffect(() => {
    if (auth.signupInfo && auth.signupInfo.subscription && auth.signupInfo.subscription[0] && auth.signupInfo.subscription[0].planType === 'freeTrial') {
      setShowModal(true);
    }
  }, [auth]);

  return (
    <div className="w-100 Views__Profile">
      {isLoading && <SpinnerWithOverLay />}
      <Modal show={showModal} closeButton={false} >
        <h1 className="text-center">Welcome to Maya EDU</h1>
        <p className="text-center">{`Let's get started. You can now use Maya EDU free trial for ${auth.subscription && auth.subscription[0] && auth.subscription[0].planSession} days.`}</p>
        <CRow className="my-4 justify-content-center">
      <Button
        color="primary"
        className="Button__Done"
        onClick={() => {
          setShowModal(false);
          resetSignup();
        }}
      >
        Done
      </Button>
    </CRow>
      </Modal>
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
              {planType === 'freeTrial' ? (
                <h5 className="text-primary font-weight-bold">
                  Free Trial {' - '}
                  {moment
                    .duration(
                      moment(endDate, 'YYYY-MM-DD').diff(
                        moment().startOf('day')
                      )
                    )
                    .asDays()}{' '}
                  Days Remaining
                </h5>
              ) : (
                <h5 className="Color-LightGray font-weight-bold">
                  Purchased on {moment(startDate).format('MM-DD-YYYY')}
                </h5>
              )}
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
                      {planType === 'freeTrial' ? 'Free Trial' : planType}
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
                      <span className="text-uppercase">{planCurrency}</span>
                    </h6>
                    <h6>
                      <span className="text-primary font-weight-bold">
                        Valid Till:{' '}
                      </span>
                      {subscriptionDateFormat(endDate, planType)}
                    </h6>
                    {planType !== 'freeTrial' && (
                      <h6>
                        <span className="text-primary font-weight-bold">
                          Plan Session:{' '}
                        </span>
                        {planSession}ly
                      </h6>
                    )}
                  </div>
                  <div className="col-md-4">
                    <h5 className="font-weight-bold Color-LightGray pt-md-0">
                      Plan Features
                    </h5>
                    {basicPlanString.map((data, index) => (
                      <div div className="d-flex" key={index * 2 + 1}>
                        <span className="d-flex align-items-center">
                          <CImg src={svgImg.checkCircleIcon} />
                        </span>
                        <h6 className="ml-2 mt-2">{data}</h6>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-2 d-flex justify-content-center align-items-center flex-column text-white">
                    <Link
                      to={endpoints.plans}
                      className="text-decoration-none text-white"
                    >
                      <Button
                        color="primary"
                        type="link"
                        className="m-0 Button"
                      >
                        {moment() > moment(endDate) ||
                        planType === 'freeTrial' ||
                        isCancel === true
                          ? 'Buy'
                          : 'Upgrade'}
                      </Button>
                    </Link>
                    {!isCancel && planType !== 'freeTrial' && (
                      <Button
                        color="secondary"
                        type="link"
                        className="m-0 mt-4 Button"
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
                  <div className="col-md-6">
                    {defaultCard && Object.keys(defaultCard).length ? (
                      <>
                        <h5 className="font-weight-bold Color-LightGray text-capitalize">
                          {(cardDetails && cardDetails.funding) || 'Unknown'}{' '}
                          Card:
                        </h5>
                        <h6>
                          XXXX XXXX XXXX {cardDetails && cardDetails.last4}{' '}
                          <CImg
                            src={
                              img.cardsIcon[cardDetails && cardDetails.brand]
                            }
                            alt={cardDetails && cardDetails.brand}
                            width={40}
                            height={15}
                          />
                        </h6>
                        <h6>
                          Valid Till:{' '}
                          {getCardNumberFormat(
                            cardDetails && cardDetails.exp_month,
                            cardDetails && cardDetails.exp_year
                          ) || 'NA'}
                        </h6>
                      </>
                    ) : (
                      <h6>Not Available!</h6>
                    )}
                  </div>
                  <div className="col-md-4 d-flex justify-content-md-end justify-content-center align-items-center">
                    <Link
                      to={endpoints.updateCard}
                      className="text-decoration-none text-white"
                    >
                      <Button color="primary text-white m-0 Button" className="mr-lg-3" type="link">
                        {defaultCard && Object.keys(defaultCard).length
                          ? 'Update'
                          : 'Add'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentWrap>
      </div>
      {isSubscriptionDeleteModal && (
        <ConfirmModal
          isVisible={isSubscriptionDeleteModal}
          onCancel={() => {
            setSubscriptionDeleteModal(false);
          }}
          onSubmit={handleSubscriptionDeleteClick}
          submitLabel="Delete"
          content="Are you sure you want to cancel your subscription?"
        />
      )}
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
  auth: PropTypes.object,
  resetSignupDetails: PropTypes.func
};
function mapStateToProps({
  card, subscriptionDetails, userDetails, auth
}) {
  return {
    card, subscriptionDetails, userDetails, auth
  };
}

export default connect(mapStateToProps, {
  fetchCard,
  fetchSubscription,
  fetchUserDetails,
  notify,
  resetSignupDetails
})(Profile);
