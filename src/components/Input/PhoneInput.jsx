import React from 'react';
import PropTypes from 'prop-types';
import { CImg } from '@coreui/react';
import Input from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './phoneInput.scss';
import SVG from '../../assets/img/svg';

function PhoneInput({
  icon, labelText, className, errorText, isReadonly, ...restProps
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
              <div className="d-flex flex-row Input__Container">
              <Input
                dropdownClass="Dropdown"
                inputClass={`Input Box--Shadow ${errorText && 'Error--Border'} ${className}`}
                inputStyle={{
                  fontWeight: '400',
                  fontSize: '0.875rem',
                }}
                dropdownStyle={restProps.disableDropdown ? { pointerEvents: 'none' } : {}}
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

PhoneInput.defaultProps = {
  labelText: '',
  errorText: '',
  maxLength: 30,
  className: '',
  isReadonly: false,
  icon: '',
};

PhoneInput.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  isReadonly: PropTypes.bool,
  icon: PropTypes.string,
};

export default PhoneInput;
