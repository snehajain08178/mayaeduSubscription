import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from '../Header/Header';
import Footer from '../Footer';

const LoginContainer = ({
  route, isLogin, isSignUp, ...restProps
}) => (
  <>
    <Header isLogin={isLogin} isSignUp={isSignUp} />
    <div className="h-100">{renderRoutes(route.routes)}</div>
    <Footer isLogin={isLogin} isSignUp={isSignUp} {...restProps} />
  </>
);

LoginContainer.propTypes = {
  route: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
  isSignUp: PropTypes.bool.isRequired,
};

export default LoginContainer;
