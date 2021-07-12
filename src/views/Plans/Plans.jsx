import { CImg } from '@coreui/react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '@coreui/icons-react';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Button from '../../components/Button';
import endpoints from '../../routes/endpoints';
import { fetchPlans } from '../../redux/actions/plans';
import { fetchSubscription } from '../../redux/actions/subscription';
import './plans.scss';
import ContentWrap from '../../components/ContentWrap/ContentWrap';
import svg from '../../assets/img/svg';
import { currencySign } from '../../libs/constants';
import Card from '../../components/Card';
import 'react-circular-progressbar/dist/styles.css';
import '../../scss/styles.scss';

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
          <div className="w-75 d-flex justify-content-between mx-auto">
            <h2 className="font-weight-bold">Choose Plan</h2>
            <div
              onClick={() => {
                history.push(endpoints.profile);
              }}
              role="button"
            >
              <Icon
                name="cil-x"
                size="xl"
                className="font-weight-bold"
              />
            </div>
          </div>
          <Card className="w-75 mx-auto">
            <div className="d-flex flex-column flex-md-row justify-content-between">
              <div className="col-12 col-md-6 px-4">
                <Card className="px-6 my-4 bg-white View_Plans">
                  <h4 className="font-weight-bold text-primary mx-auto mt-4">Basic-Monthly</h4>
                  <div className="col-6 col-md-4 mx-auto py-4">
                    <CircularProgressbar
                      value={1}
                      maxValue={1}
                      text={`${currencySign[basicMonthly.currency]} ${basicMonthly.amount / 100}`}
                      styles={buildStyles({
                        pathColor: '#69013b',
                        textColor: '#000000',
                        trailColor: '#C094AC',
                      })}/>
                  </div>
                  <div className="w-75 text-jusitify mx-auto">
                    <p>
                      <CImg src={svg.checkCircleIcon} />
                      <span className="mt-2 ml-2">
                        Unlimited patient diagnosis with AI assistance.
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
                      Study Material to help you prepare for the exams.
                      </span>
                    </p>
                    <p>
                      <CImg src={svg.checkCircleIcon} />
                      <span className="ml-2 mt-2">
                      Active Cases to help you improve your diagnostic skills.
                      </span>
                    </p>
                  </div>
                  <div
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
                    className="mx-auto my-4"
                  >
                    <Link
                      to={`${endpoints.payment}?id=${basicMonthly.id}`}
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
                        Get A Plan
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
              <div className="col-12 col-md-6 px-4">
                <Card className="p-6 my-4 bg-white View_Plans">
                  <h4 className="font-weight-bold text-primary mx-auto mt-4">Basic-Anually</h4>
                  <div className="col-6 col-md-4 mx-auto py-4">
                    <CircularProgressbar value={1} maxValue={1} text={`${currencySign[basicMonthly.currency]} ${basicAnually.amount / 100}`}
                      styles={buildStyles({
                        pathColor: '#69013b',
                        textColor: '#000000',
                        trailColor: '#C094AC',
                      })}/>
                  </div>
                  <div className="w-75 text-jusitify mx-auto">
                    <p>
                      <CImg src={svg.checkCircleIcon} />
                      <span className="mt-2 ml-2">
                        Unlimited patient diagnosis with AI assistance.
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
                      Study Material to help you prepare for the exams.
                      </span>
                    </p>
                    <p>
                      <CImg src={svg.checkCircleIcon} />
                      <span className="ml-2 mt-2">
                      Active Cases to help you improve your diagnostic skills.
                      </span>
                    </p>
                  </div>
                  <div
                    style={
                      planType === 'basic' &&
                      status === 'Active' &&
                      planSession === 'year' &&
                      !isCancel
                        ? { pointerEvents: 'none' }
                        : {}
                    }
                    className="mx-auto my-4"
                  >
                    <Link
                      to={`${endpoints.payment}?id=${basicAnually.id}`}
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
                        Get A Plan
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
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
