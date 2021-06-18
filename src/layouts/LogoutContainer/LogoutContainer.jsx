import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Footer from '../Footer';
import './logoutContainer.scss';
import LogoutHeader from '../Header/LogoutHeader';

const LogoutContainer = ({ route }) => (
  <>
    <LogoutHeader />
    <div className="w-100 Bg--Color-lightPink Layouts__LogoutContainer">
      {renderRoutes(route.routes)}
    </div>
    <Footer />
  </>
);

LogoutContainer.propTypes = {
  route: PropTypes.object.isRequired,
};

export default LogoutContainer;
