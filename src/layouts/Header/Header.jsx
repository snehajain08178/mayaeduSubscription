import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import './header.scss';

export default function Header({ route }) {
  return (
    <>
      <div className="Layouts__Header">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark row-inverse">
          <a className="navbar-brand" href="#">
            <h4 className="font-weight-bold">mayaEDU</h4>
          </a>
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
            <span className="navbar-toggler-icon text-white"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-row-reverse"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <h5 className="font-weight-bold">About</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white font-weight-bold" href="#">
                  <h5 className="font-weight-bold">Sing In</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white font-weight-bold" href="#">
                  <h5 className="font-weight-bold">Sing Up</h5>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {renderRoutes(route.routes)}
    </>
  );
}

Header.propTypes = {
  route: PropTypes.object.isRequired,
};
