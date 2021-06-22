import React from 'react';
import './radio.scss';

export default function Radio({ ...props }) {
  return (
    <div className="Component__Radio">
      <label className="container">
        <input type="radio" {...props} />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}
