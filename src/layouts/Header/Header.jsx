import { CImg } from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import img from '../../assets/img';
import endpoints from '../../routes/endpoints';
import { institutionalSignIn } from '../../libs/strings';
import './Header.scss';

export default function Header({ isLogin, isSignUp }) {
  return (
    <>
      <div className="Layouts__Header">
        <div className="VerticalLine v1"></div>
        <div className="VerticalLine v2"></div>
        <nav className="navbar row-inverse HeaderView">
          <Link className="navbar-brand mt-2" to={endpoints.home}>
            <h4 className="font-weight-bold">
              <CImg src={img.logoIcon} />
              <CImg src={img.headerIcon} width={100} height={26} style={{ marginLeft: '15px' }} />
            </h4>
          </Link>
          <div
            className="d-flex"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item">
                <a
                  className="nav-link text-white font-weight-bold"
                  href='https://maya-edu-production.web.app/'
                  target="__blank"
                >
                  <h6 className="font-weight-bold px-4 ButtonView">{institutionalSignIn}</h6>
                </a>
              </li>
              {isLogin && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-white font-weight-bold"
                    to={endpoints.signup}
                  >
                    <h6 className="font-weight-bold px-4 ButtonView">Sign Up</h6>
                  </Link>
                </li>
              )}
              {isSignUp && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-white font-weight-bold"
                    to={endpoints.login}
                  >
                    <h6 className="px-4 font-weight-bold ButtonView">Sign In</h6>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <hr className="one"></hr>
        <hr className="two"></hr>
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
