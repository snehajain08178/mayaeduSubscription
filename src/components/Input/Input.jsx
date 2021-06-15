import React from 'react';
import PropTypes from 'prop-types';
import { CInput } from '@coreui/react';
import './input.scss';

function Input({
  labelText, className, errorText, isReadonly, ...restProps
}) {
  return (
    <div className="Components___Input">
      {
        labelText
        && <div className={`Input__Label ${errorText && 'Error'}`}>{labelText}</div>
      }
      {
        isReadonly
          ? (
            <div className="GrayDark-Text Input__Value" style={{ marginTop: '17px', wordBreak: 'break-all' }}>
              {restProps.value}
            </div>
          )
          : (
            <>
              <CInput
                autoComplete="new-password"
                className={`Input Box--Shadow ${errorText && 'Error--Border'} ${className}`}
                {...restProps}
              />
              {
                errorText && <span className="Input__Error">{errorText}</span>
              }
            </>
          )
      }
    </div>
  );
}

Input.defaultProps = {
  labelText: '',
  errorText: '',
  maxLength: 30,
  className: '',
  isReadonly: false,
};

Input.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  isReadonly: PropTypes.bool,
};

export default Input;
