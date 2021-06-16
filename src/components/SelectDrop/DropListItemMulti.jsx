import React from 'react';
import PropTypes from 'prop-types';
import { CInputCheckbox } from '@coreui/react';

export default function DropListItemMulti({
  value, isChecked, onSelect, onDeselect, index,
}) {
  function handleSelectDeselect(event) {
    if (event.target.checked) {
      onSelect(value);
    } else {
      onDeselect(value);
    }
  }
  return (
    <div className={`DropListItemMulti ${(index % 2) ? 'Bg-Gray' : ''}`}>
    <CInputCheckbox
      checked={isChecked}
      onChange={handleSelectDeselect}
      id={value.id}
      style={{ marginLeft: '0px', width: '15px' }}
        name={value.name}
        value={value.name}
    />
      <span className="Ml--20 Mt--2">{value.name}</span>
      </div>
  );
}

DropListItemMulti.propTypes = {
  value: PropTypes.object.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
