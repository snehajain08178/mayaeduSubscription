import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

/**
 * @componentName Layout Default
 * @description Without header or siderbar layout for Views components.
 */
export default function Default(props) {
  const { route } = props;
  return (
    <div>
    {renderRoutes(route.routes)}
    </div>
  );
}

Default.propTypes = {
  route: PropTypes.object.isRequired,
};
