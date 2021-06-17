import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@coreui/icons-react';

export default function SelectedItem({ value, onDeselect, isReadonly }) {
  function handleSelectDeselect() {
    onDeselect(value);
  }
  function handleKeyPress(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      onDeselect(value);
    }
  }
  return (
    <span className="SelectedItem">
      <span className="SelectedItemName">{value.name}</span>
      {
        !isReadonly
        && (
          <span
            onClick={handleSelectDeselect}
            role="button"
            tabIndex={0}
            className="Cursor-Pointer"
            style={{ outline: 'none' }}
            onKeyPress={handleKeyPress}
          >
            <Icon name="cil-x" style={{ marginLeft: '5px', color: 'red' }}/>
          </span>
        )
      }
    </span>
  );
}

SelectedItem.defaultProps = {
  isReadonly: false,
};

SelectedItem.propTypes = {
  value: PropTypes.object.isRequired,
  onDeselect: PropTypes.func.isRequired,
  isReadonly: PropTypes.bool,
};
