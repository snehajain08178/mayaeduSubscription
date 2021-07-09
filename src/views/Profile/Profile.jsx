import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { CImg, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
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
import { deleteSubscription } from '../../api/subscription';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { resetSignupDetails } from '../../redux/actions/auth';
import { subscriptionDateFormat } from '../../libs/common';
import '../../scss/styles.scss';
import Card from '../Payment/component/Card';
import 'react-circular-progressbar/dist/styles.css';

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
  const totalDays = moment(endDate).diff(moment(startDate), 'days');
  const remainingDays = moment(endDate).diff(moment(), 'days');

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
      {showModal &&
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      }
      <Modal show={showModal} closeButton={false} >
        <h1 className="text-center ml10">
          <span className="text-wrapper">
            <span className="letters"> Welcome to Maya EDU</span>
          </span>
        </h1>
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
      <div className="h-100">
        <ContentWrap
          style={{ margin: '0 auto', width: '10%' }}
          isFetching={
            card.isFetching ||
            subscriptionDetails.isFetching ||
            userDetails.isFetching
          }
        >
          <div className="container row flex-column">
            <div className="col w-100 mt-5 mx-3">
              <h2 className="font-weight-bold text-primary">Profile</h2>
              {planType === 'freeTrial' ? (
                <h5 className="text-dark font-weight-bold">
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
                <h5 className="text-dark font-weight-bold">
                  Purchased on {moment(startDate).format('MM-DD-YYYY')}
                </h5>
              )}
            </div>
          </div>
          <div className="py-4 d-flex flex-column flex-sm-row justify-content-center w-100">
            <div className="col-12 col-sm-5 col-md-6 d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center w-100 Main_View">
                <div className="bg-white d-flex flex-column w-100 P--20 Border-Radius--30px">
                  <h5 className="text-primary font-weight-bold">
                    Account Details
                  </h5>
                  <div className="d-flex w-100 flex-column align-self-center justify-content-center Inner_View">
                    <h6 className="text-dark">
                      <span className="text-primary font-weight-bold">
                        Name:{' '}
                      </span>
                      {name || 'NA'}
                    </h6>
                    <h6 className="text-dark">
                      <span className="text-primary font-weight-bold">
                        Email:{' '}
                      </span>
                      {email || 'NA'}
                    </h6>
                    <h6 className="text-dark">
                      <span className="text-primary font-weight-bold">
                        Country:{' '}
                      </span>
                      {(country && country.name) || 'NA'}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center w-100 Main_View">
                <div className="bg-white d-flex flex-column w-100 P--20 Border-Radius--30px">
                  <h5 className="text-primary font-weight-bold text-capitalize">
                    Payment Method ({(cardDetails && cardDetails.funding) || 'Unknown'}{' '} Card)
                  </h5>
                  <div className="d-flex w-100 flex-column align-self-center justify-content-center Inner_View">
                    {defaultCard && Object.keys(defaultCard).length ? (
                      <>
                        <div className="Mt--15">
                          <Card details={defaultCard || {}} />
                        </div>
                      </>
                    ) : (
                      <h6>Not Available!</h6>
                    )}
                    <div className="d-flex justify-content-center align-items-center Mt--20">
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
            <div className="col-12 col-sm-7 col-md-6 d-flex align-items-center Main_View">
              <div className="bg-white d-flex flex-column w-100 P--20 Border-Radius--30px">
                <h5 className="text-primary font-weight-bold" style={{ margin: '0 0 20px 0' }}>
                  Plan Information
                </h5>
                <div className="d-flex w-100 flex-column align-self-center justify-content-center Inner_View_Features">
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <div className="col-6 col-md-8">
                      <h6 className="text-dark">
                        <span className="text-primary font-weight-bold">
                          Plan Type:{' '}
                        </span>
                        {planType === 'freeTrial' ? 'Free Trial' : planType}
                      </h6>
                      <h6 className="text-dark">
                        <span className="text-primary font-weight-bold">
                          Status:{' '}
                        </span>
                        {status}
                      </h6>
                      <h6 className="text-dark">
                        <span className="text-primary font-weight-bold">
                          Currency:{' '}
                        </span>
                        <span className="text-uppercase">{planCurrency}</span>
                      </h6>
                      <h6 className="text-dark">
                        <span className="text-primary font-weight-bold">
                          Valid Till:{' '}
                        </span>
                        {subscriptionDateFormat(endDate, planType)}
                      </h6>
                      {planType !== 'freeTrial' && (
                        <h6 className="text-dark">
                          <span className="text-primary font-weight-bold">
                            Plan Session:{' '}
                          </span>
                          {planSession}ly
                        </h6>
                      )}
                      <h6 className="text-dark">
                        <span className="text-primary font-weight-bold">
                          Plan Type:{' '}
                        </span>
                        {planType === 'freeTrial' ? 'Free Trial' : planType}
                      </h6>
                    </div>
                    <div className="col-6 col-md-4">
                        <CircularProgressbar value={remainingDays} maxValue={totalDays}
                          text={remainingDays} styles={buildStyles({
                            pathColor: '#69013b',
                            textColor: '#000000',
                            trailColor: '#C094AC',
                          })}/>
                      <p className="text-center text-dark mt-2">DAYS REMAINING TOGO</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-md-row justify-content-center w-80 mx-auto">
                    <Link
                      to={endpoints.plans}
                      className="text-decoration-none text-white"
                    >
                      <Button
                        color="primary"
                        type="link"
                        className="m-2 Button"
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
                        className="m-2 Button"
                        onClick={handleDelete}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>

                <h5 className="font-weight-bold text-primary" style={{ margin: '20px 0' }}>
                  Plan Features
                </h5>
                <div className="d-flex w-100 flex-column align-self-center justify-content-center Inner_View_Features">
                  {basicPlanString.map((data, index) => (
                    <div div className="d-flex" key={index * 2 + 1}>
                      <span className="d-flex align-items-center">
                        <CImg src={svgImg.checkCircleIcon} />
                      </span>
                      <h6 className="ml-2 mt-2 text-dark">{data}</h6>
                    </div>
                  ))}
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
