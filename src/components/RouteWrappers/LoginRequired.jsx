import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { Redirect, Route } from 'react-router';
import { isTokenAvailable } from 'libs/auth';
import endpoints from '../../routes/endpoints';

function LoginRequired(props) {
  const { route } = props;

  return (
    <Route render={
      () => (!isTokenAvailable() ? (
        <Redirect to={endpoints.login} />
      ) : (
        renderRoutes(route.routes, { ...props })
      ))
    }
    />
  );
}

LoginRequired.propTypes = {
  route: PropTypes.object.isRequired,
};

export default LoginRequired;
