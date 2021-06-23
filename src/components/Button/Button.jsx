import { CButton } from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

function Button({
  color, className, children, ...props
}) {
  return (
    <CButton
      color={color}
      className={`Button ${className} ButtonType${color}`}
      {...props}
    >
      {children}
    </CButton>
  );
}

Button.defaultProps = {
  color: '',
  className: '',
};

Button.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default Button;
