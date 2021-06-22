import { CImg } from '@coreui/react';
import React, { useState } from 'react';
import Modal from '../../components/Modal';
import img from '../../assets/img';
import './footer.scss';
import { termsAndConditions } from '../../libs/strings';
import TermAndConditions from '../../components/TermsAndConditions';

export default function Footer() {
  const [termConditionVisible, settermConditionVisible] = useState(false);
  return (
    <div className="Layouts__Footer">
      <div className="d-flex">
        <div className="text-primary font-weight-bold p-1 px-2">
          <CImg src={img.footerIcon} width={100} height={20} />
        </div>
        <div
          className="text-primary font-weight-bold p-1 px-2"
          role="button"
          onClick={() => {
            settermConditionVisible(true);
          }}
        >
          {'Terms & Conditions'}
        </div>
        <div className="text-primary font-weight-bold p-1 px-2 text-decoration-none">
          <a
            className="text-decoration-none"
            href="https://www.mayamd.ai/about"
          >
            About Us
          </a>
        </div>
      </div>
      <Modal
        show={termConditionVisible}
        onClose={() => settermConditionVisible(false)}
        title={termsAndConditions}
      >
        <TermAndConditions />
      </Modal>
    </div>
  );
}
