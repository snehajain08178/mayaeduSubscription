import { CImg } from '@coreui/react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '@coreui/icons-react';
import PropTypes from 'prop-types';
import img from '../../assets/img';
import Button from '../../components/Button';
import endpoints from '../../routes/endpoints';
import { fetchPlans } from '../../redux/actions/plans';
import { fetchSubscription } from '../../redux/actions/subscription';
import './plans.scss';
import ContentWrap from '../../components/ContentWrap/ContentWrap';
import svg from '../../assets/img/svg';

function Plans({
  fetchPlans: fetchPlansAction,
  plans,
  fetchSubscription: fetchSubscriptionAction,
  subscriptionDetails,
  history,
}) {
  const { info, isFetching, isError } = plans || {};
  const { basic } = (info && info.plans) || {};
  const basicMonthly = basic && basic.length ? basic[0] : {};
  const basicAnually = basic && basic.length ? basic[1] : {};
  const { subscriptions = [] } =
    (subscriptionDetails && subscriptionDetails.info) || {};

  useEffect(() => {
    fetchPlansAction();

    if (subscriptions && !subscriptions.length) {
      fetchSubscriptionAction();
    }
  }, []);

  const {
    planType, status, planSession, isCancel
  } =
    (subscriptions && subscriptions.length && subscriptions[0]) || {};

  return (
    <div className="w-100 h-100 Views__Plans">
      <div className="container h-100">
        <ContentWrap
          isFetching={isFetching || subscriptionDetails.isFetching}
          isError={isError}
        >
          <div className="row flex-column pt-lg-5">
            <div className="col w-100 d-flex justify-content-between">
              <h2 className="font-weight-bold">Choose Plan</h2>
              <div
                onClick={() => {
                  history.push(endpoints.profile);
                }}
                role="button"
              >
                <Icon
                  name="cil-arrow-left"
                  size="xl"
                  className="font-weight-bold"
                />
              </div>
            </div>
            <div className="col pt-lg-2">
              <div className="shadow p-3 bg-white rounded">
                <div className="pt-2 d-flex align-items-center">
                  <span>
                    <CImg src={img.bookImg} width={30} height={36} />
                  </span>
                  <h4 className="font-weight-bold ml-2 mt-1">Basic-Monthly</h4>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-9">
                    <p>
                      <CImg src={svg.checkCircleIcon} />
                      <span className="mt-2 ml-2">
                        Unlimited patient diagnosis with AI Assiatance
                      </span>
                    </p>
                    <p>
                      <CImg src={svg.checkCircleIcon} />
                      <span className="mt-2 ml-2">
                        Clinical Cases with feedback everyday to prepare you for
                        the unpredictable.
                      </span>
                    </p>
                    <p>
                      <CImg src={svg.checkCircleIcon} />
                      <span className="ml-2 mt-2">
                        Active Cases to help you improve diagnosis skills
                      </span>
                    </p>
                  </div>
                  <div
                    className="col-md-3 d-flex justify-content-center justify-content-md-end h-100"
                    style={
                      ((planType === 'basic' &&
                        status === 'Active' &&
                        planSession === 'month') ||
                        (planType === 'basic' &&
                          status === 'Active' &&
                          planSession === 'year')) &&
                      !isCancel
                        ? { pointerEvents: 'none' }
                        : {}
                    }
                  >
                    <Link
                      to={`${endpoints.cards}?id=${basicMonthly.id}`}
                      className="text-decoration-none text-white"
                    >
                      <Button
                        className="Button"
                        color="primary"
                        type="link"
                        disabled={
                          ((planType === 'basic' &&
                            status === 'Active' &&
                            planSession === 'month') ||
                            (planType === 'basic' &&
                              status === 'Active' &&
                              planSession === 'year')) &&
                          !isCancel
                        }
                      >
                        {basicMonthly.currency} {basicMonthly.amount / 100}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col pt-2">
              <div className="shadow p-3 bg-white rounded">
                <div className="pt-2 d-flex align-items-center">
                  <span>
                    <CImg src={img.bookImg} width={30} height={36} />
                  </span>
                  <h4 className="font-weight-bold ml-2 mt-1">Basic-Anually</h4>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-9">
                    <p>
                      <CImg src={svg.checkCircleIcon} />
                      <span className="ml-2 mt-2">
                        Unlimited patient diagnosis with AI Assiatance
                      </span>
                    </p>
                    <p>
                      <CImg src={svg.checkCircleIcon} />
                      <span className="ml-2 mt-2">
                        Clinical Cases with feedback everyday to prepare you for
                        the unpredictable.
                      </span>
                    </p>
                    <p>
                      <CImg src={svg.checkCircleIcon} />
                      <span className="ml-2 mt-2">
                        Active Cases to help you improve diagnosis skills
                      </span>
                    </p>
                  </div>
                  <div
                    className="col-md-3 d-flex justify-content-center justify-content-md-end h-100"
                    style={
                      planType === 'basic' &&
                      status === 'Active' &&
                      planSession === 'year' &&
                      !isCancel
                        ? { pointerEvents: 'none' }
                        : {}
                    }
                  >
                    <Link
                      to={`${endpoints.cards}?id=${basicAnually.id}`}
                      className="text-decoration-none text-white"
                    >
                      <Button
                        color="primary"
                        type="link"
                        className="Button"
                        disabled={
                          planType === 'basic' &&
                          status === 'Active' &&
                          planSession === 'year' &&
                          !isCancel
                        }
                      >
                        {basicAnually.currency} {basicAnually.amount / 100}
                      </Button>
                    </Link>
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

Plans.propTypes = {
  fetchPlans: PropTypes.func.isRequired,
  plans: PropTypes.object.isRequired,
  subscriptionDetails: PropTypes.object.isRequired,
  fetchSubscription: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps({ plans, subscriptionDetails }) {
  return { plans, subscriptionDetails };
}

export default connect(mapStateToProps, {
  fetchPlans,
  fetchSubscription,
})(Plans);
