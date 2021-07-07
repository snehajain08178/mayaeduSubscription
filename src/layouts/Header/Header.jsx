import { CImg } from '@coreui/react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import img from '../../assets/img';
import endpoints from '../../routes/endpoints';
import { institutionalSignIn } from '../../libs/strings';
import './Header.scss';

export default function Header({ isLogin, isSignUp }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="Layouts__Header">
        <div className="VerticalLine v1"></div>
        <div className="VerticalLine v2"></div>
        <nav className="navbar row-inverse HeaderView">
          <Link className="navbar-brand mt-2" to={endpoints.home}>
            <h4 className="font-weight-bold">
              <CImg src={img.logoIcon}/>
              <CImg src={img.headerIcon} style={{ marginLeft: '15px', marginTop: '10px' }} height={25}/>
            </h4>
          </Link>
          <div
            className="d-none d-xl-block"
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
              <li className="nav-item">
                <Link
                  className="nav-link text-white font-weight-bold"
                  to={endpoints.contactUs}
                >
                  <h6 className="font-weight-bold px-4 ButtonView">Contact Us</h6>
                </Link>
              </li>
            </ul>
          </div>
          <div className=".d-xl-none d-lg-none .d-xl-block" style={{ position: 'relative', marginRight: '-15px' }}>
            <HamburgerMenu
              isOpen={isMenuOpen}
              menuClicked={() => setIsMenuOpen(!isMenuOpen)}
              width={18}
              height={15}
              strokeWidth={1}
              rotate={0}
              color='white'
              borderRadius={0}
              animationDuration={0.5}
            />
          </div>
          {isMenuOpen &&
            <div className=".d-xl-none d-lg-none .d-xl-block Hamburger_Options" style={{
              position: 'absolute', zIndex: 3000, backgroundColor: '#f7f2f5', right: '15px', top: '80%', width: '70%', borderRadius: '15px'
            }}>
              <a
                className="nav-link font-weight-bold"
                href='https://maya-edu-production.web.app/'
                target="__blank"
              >
                <h6 className="font-weight-bold px-4 text-primary mt-2">{institutionalSignIn}</h6>
              </a>
              {isLogin && (
                <Link
                  className="nav-link font-weight-bold"
                  to={endpoints.signup}
                >
                  <h6 className="font-weight-bold px-4 text-primary">Sign Up</h6>
                </Link>
              )}
              {isSignUp && (
                  <Link
                    className="nav-link font-weight-bold"
                    to={endpoints.login}
                  >
                    <h6 className="px-4 font-weight-bold text-primary">Sign In</h6>
                  </Link>
              )}
              <Link
                className="nav-link text-primary font-weight-bold"
                to={endpoints.contactUs}
              >
                <h6 className="font-weight-bold px-4 text-primary">Contact Us</h6>
              </Link>
            </div>
          }
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
