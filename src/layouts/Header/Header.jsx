import { CImg } from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import img from '../../assets/img';
import endpoints from '../../routes/endpoints';

export default function Header({ isLogin, isSignUp }) {
  console.log(isLogin, isSignUp, 'hello');
  return (
    <>
      <div className="Layouts__Header">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark row-inverse">
          <Link className="navbar-brand mt-2" to={endpoints.home}>
            <h4 className="font-weight-bold">
              <CImg src={img.headerIcon} width={110} height={20} />
            </h4>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ outline: 'none' }}
          >
            <span>
              <GiHamburgerMenu color="white" width={30} />
            </span>
          </button>
          <div
            className="collapse navbar-collapse flex-row-reverse"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {!isLogin && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-white font-weight-bold"
                    to={endpoints.login}
                  >
                    <h5 className="font-weight-bold px-4">Sign In</h5>
                  </Link>
                </li>
              )}
              {!isSignUp && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-white font-weight-bold"
                    to={endpoints.signup}
                  >
                    <h5 className="font-weight-bold px-4">Sign Up</h5>
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
