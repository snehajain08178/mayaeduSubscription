import React from 'react';
import PropTypes from 'prop-types';
import { CInput, CImg } from '@coreui/react';
import './input.scss';
import SVG from '../../assets/img/svg';

function Input({
  setPasswordVisibility, icon, labelText, className, errorText, isReadonly, ...restProps
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
              <div className="d-flex flex-row">
              <CInput
                autoComplete="new-password"
                className={`Input Box--Shadow ${errorText && 'Error--Border'} ${className}`}
                {...restProps}
              />
              {
                errorText && <span className="Input__Error">{errorText}</span>
              }
              {icon &&
              <div>
                <CImg
                  src={SVG[icon]}
                  className="svgInputIcons"
                  onClick={() => {
                    if (setPasswordVisibility) {
                      setPasswordVisibility();
                    }
                  }}
                />
              </div>
              }
              </div>
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
  icon: '',
};

Input.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  isReadonly: PropTypes.bool,
  icon: PropTypes.string,
  setPasswordVisibility: PropTypes.func,
};

export default Input;
