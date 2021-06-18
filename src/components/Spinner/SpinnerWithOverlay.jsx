import React from 'react';
import { CSpinner } from '@coreui/react';
import './spinner.scss';

export const SpinnerWithOverLay = () => (
  <div className="Loader-Overlay">
    <div className="Overlay__Inner">
      <div className="Overlay__Content">
      <CSpinner color="primary" />
      </div>
    </div>
  </div>
);

export default {
  SpinnerWithOverLay,
};
