import { CImg } from '@coreui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import PropTypes from 'prop-types';
import { ImSwitch } from 'react-icons/im';
import { connect } from 'react-redux';
import img from '../../assets/img';
import { logoutUser } from '../../redux/actions/auth';
import ConfirmModal from '../../components/Modal/ConfirmModal';

function LogoutHeader({ logoutUser: logoutUserAction }) {
  const [isConfirmModal, setConfirmModal] = useState(false);
  function handleLogout() {
    setConfirmModal(true);
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
                <h6
                  className="font-weight-bold px-4 align-items-center d-flex"
                  onClick={handleLogout}
                  role="button"
                >
                  <ImSwitch color="white" />
                  <span className="ml-2 text-white">Logout</span>
                </h6>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {isConfirmModal && (
        <ConfirmModal
          isVisible={isConfirmModal}
          onCancel={() => {
            setConfirmModal(false);
          }}
          onSubmit={() => {
            logoutUserAction();
          }}
          submitLabel="Delete"
          content="Are you sure you want to logout?"
        />
      )}
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
