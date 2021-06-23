import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { isTokenAvailable } from 'libs/auth';
import { Redirect, Route } from 'react-router';
import endpoints from '../../routes/endpoints';

function LogoutRequired(props) {
  const { route } = props;

  return (
    <Route render={
      () => (isTokenAvailable() ? (
        <Redirect to={endpoints.profile} />
      ) : (
        renderRoutes(route.routes, { ...props })
      ))
    }
    />
  );
}

LogoutRequired.propTypes = {
  route: PropTypes.object.isRequired,
};

export default LogoutRequired;
