import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

/**
 * @componentName Header
 * @description Sidebar used over Orders view has default style and style can be extended or
 * overrided.
 */
function Header({ children, className }) {
  return (
    <div className={`Header ${className}`}>
      {children}
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Header.defaultProps = {
  className: ''
};

export default React.memo(Header);
