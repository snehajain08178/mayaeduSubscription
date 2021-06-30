import { CTextarea } from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';

import './textArea.scss';

function TextArea({
  labelText, maxLength, errorText, isReadonly, ...restProps
}) {
  return (
    <div className="TextArea">
      {
        labelText
        && <div className={`TextArea__Label ${errorText && 'Error'}`}>{labelText}</div>
      }
      {
        isReadonly
          ? (
            (<div className="TextArea__Value" style={{ height: 'auto' }}>
                {restProps.value}
                </div>
            )
          )
          : (
            <CTextarea maxLength={maxLength} className={`TextArea__Input Box--Shadow ${errorText && 'Error--Border'}`} {...restProps} />
          )
      }
      {
        errorText && <span className="TextArea__Error">{errorText}</span>
      }
    </div>
  );
}

TextArea.defaultProps = {
  labelText: '',
  errorText: '',
  maxLength: 200,
  isReadonly: false,
};

TextArea.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  maxLength: PropTypes.number,
  isReadonly: PropTypes.bool,
};

export default TextArea;
