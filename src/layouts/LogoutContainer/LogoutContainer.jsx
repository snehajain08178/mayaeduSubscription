import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from '../Header/Header';
import Footer from '../Footer';

const LogoutContainer = ({ route }) => (
    <>
      <Header />
      {renderRoutes(route.routes)}
      <Footer />
    </>
);

LogoutContainer.propTypes = {
  route: PropTypes.object.isRequired,
};

export default LogoutContainer;
