import { CImg } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import PropTypes from 'prop-types';
import { ImSwitch } from 'react-icons/im';
import { connect } from 'react-redux';
import img from '../../assets/img';
import endpoints from '../../routes/endpoints';
import { logoutUser } from '../../redux/actions/auth';

function LogoutHeader({ logoutUser: logoutUserAction }) {
  function handleLogout() {
    logoutUserAction();
  }
  return (
    <>
      <div className="Layouts__LogoutHeader">
        <nav className="navbar navbar-expand navbar-dark bg-dark row-inverse">
          <Link className="navbar-brand mt-2">
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
              <li className="nav-item">
                <Link
                  className="nav-link text-white font-weight-bold"
                  to={endpoints.login}
                >
                  <h5 className="font-weight-bold px-4 align-items-center d-flex">
                    <ImSwitch color="white" />
                    <span className="ml-2 mt-1" onClick={handleLogout}>
                      Logout
                    </span>
                  </h5>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

LogoutHeader.propTypes = {
  history: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { logoutUser })(LogoutHeader);
