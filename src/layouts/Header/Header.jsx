import { CImg } from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import img from '../../assets/img';
import endpoints from '../../routes/endpoints';

export default function Header({ isLogin, isSignUp }) {
  return (
    <>
      <div className="Layouts__Header">
        <nav className="navbar  navbar-dark bg-dark row-inverse">
          <Link className="navbar-brand mt-2" to={endpoints.home}>
            <h4 className="font-weight-bold">
              <CImg src={img.headerIcon} width={110} height={20} />
            </h4>
          </Link>
          <div
            className="d-flex"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex flex-row">
              {isSignUp && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-white font-weight-bold"
                    to={endpoints.login}
                  >
                    <h6 className="px-4 font-weight-bold">Sign In</h6>
                  </Link>
                </li>
              )}
              {isLogin && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-white font-weight-bold"
                    to={endpoints.signup}
                  >
                    <h6 className="font-weight-bold px-4">Sign Up</h6>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

Header.defaultProps = {
  isLogin: false,
  isSignUp: false,
};

Header.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isSignUp: PropTypes.bool,
};
