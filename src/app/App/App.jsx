import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
/**
 * @componentName App
 */
function App(props) {
  const { route } = props;
  return (
    <>
      {renderRoutes(route.routes)}
    </>
  );
}

App.propTypes = {
  route: PropTypes.object.isRequired
};

export default memo(App);
