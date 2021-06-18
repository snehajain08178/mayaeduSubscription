import { CImg } from '@coreui/react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import img from '../../assets/img';
import Button from '../../components/Button';
import endpoints from '../../routes/endpoints';
import { fetchPlans } from '../../redux/actions/plans';

import './plans.scss';
import ContentWrap from '../../components/ContentWrap/ContentWrap';

function Plans({ fetchPlans: fetchPlansAction, plans }) {
  const { info, isFetching, isError } = plans || {};
  const { basic } = (info && info.plans) || {};
  const basicMonthly = basic && basic.length ? basic[0] : {};
  const basicAnually = basic && basic.length ? basic[1] : {};

  useEffect(() => {
    fetchPlansAction();
  }, []);

  return (
    <div className="w-100 h-100 Views__Plans">
      <div className="container h-100">
        <ContentWrap isFetching={isFetching} isError={isError}>
          <div className="row flex-column pt-lg-5">
            <div className="col w-100">
              <h2 className="font-weight-bold">Choose Plan</h2>
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
                    <p>Unlimited patient diagnosis with AI Assiatance</p>
                    <p>
                      Clinical Cases with feedback everyday to prepare you for
                      the unpredictable.
                    </p>
                    <p>Active Cases to help you improve diagnosis skills</p>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center justify-content-md-end h-100">
                    <Button color="primary" type="link">
                      <Link
                        to={`${endpoints.cards}?id=${basicMonthly.id}`}
                        className="text-decoration-none text-white"
                      >
                        {basicMonthly.currency}{' '}{basicMonthly.amount / 100}
                      </Link>
                    </Button>
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
                    <p>Unlimited patient diagnosis with AI Assiatance</p>
                    <p>
                      Clinical Cases with feedback everyday to prepare you for
                      the unpredictable.
                    </p>
                    <p>Active Cases to help you improve diagnosis skills</p>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center justify-content-md-end h-100">
                    <Button color="primary" type="link">
                      <Link
                        to={`${endpoints.cards}?id=${basicAnually.id}`}
                        className="text-decoration-none text-white"
                      >
                        {basicAnually.currency}{' '}{basicAnually.amount / 100}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col pt-3 container">
              <div className="row mx-auto flex-md-row-reverse justify-content-center w-50">
                <div className="col-md-6 p-0 d-flex justify-content-center">
                  <Button
                    color="primary"
                    className="Button__Continue shadow-sm"
                  >
                    Continue
                  </Button>
                </div>
                <div className="col-md-6 p-0 mt-3 mt-lg-0 d-flex justify-content-center">
                  <Button
                    color="secondary"
                    className="Button__Cancel shadow-sm"
                  >
                    Cancel
                  </Button>
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
};

function mapStateToProps({ plans }) {
  return { plans };
}

export default connect(mapStateToProps, {
  fetchPlans,
})(Plans);
