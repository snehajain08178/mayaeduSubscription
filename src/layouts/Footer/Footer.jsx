import { CImg } from '@coreui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import img from '../../assets/img';
import './footer.scss';
import { termsAndConditions } from '../../libs/strings';
import TermAndConditions from '../../components/TermsAndConditions';
import endpoints from '../../routes/endpoints';

export default function Footer({ ...restProps }) {
  const [termConditionVisible, settermConditionVisible] = useState(false);
  return (
    <div className="Layouts__Footer">
      <div className="d-flex">
        <div className="text-primary font-weight-bold p-1 px-2 d-flex align-items-center">
          <CImg src={img.footerIcon} width={100} height={20} />
        </div>
        <div
          className="text-primary font-weight-bold p-1 px-2 text-center"
          role="button"
          onClick={() => {
            settermConditionVisible(true);
          }}
        >
          {'Terms & Conditions'}
        </div>
        <div className="text-primary font-weight-bold p-1 px-2 text-decoration-none">
          <a
            className="text-decoration-none text-center"
            href="https://www.mayamd.ai/about"
          >
            About Us
          </a>
        </div>
        {restProps.isLogin && (
          <div className="text-primary font-weight-bold p-1 px-2 text-decoration-none">
            <Link
              className="text-decoration-none text-center"
              to={endpoints.contactUs}
            >
              Contact Us
            </Link>
          </div>
        )}
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
