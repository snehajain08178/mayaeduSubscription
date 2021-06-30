import { CImg } from '@coreui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import img from '../../assets/img';
import './footer.scss';
import {
  termsAndConditions,
  downloadApp,
  googlePay,
  appStore,
  copyright,
} from '../../libs/strings';
import TermAndConditions from '../../components/TermsAndConditions';
import endpoints from '../../routes/endpoints';
import Button from '../../components/Button';
import '../../scss/styles.scss';

export default function Footer({ ...restProps }) {
  const [termConditionVisible, settermConditionVisible] = useState(false);
  return (
    <div className="Layouts__Footer">
      <div className="d-flex row">
        <div className="col-md-6 justify-content-center">
          <div style={{ paddingTop: '14px' }}>
            <p className="text-center font-weight-bold Font-Size--22px text-white">
              {downloadApp}
            </p>
          </div>
          <div className="justify-content-center d-flex">
            <Button
              color="primary"
              className="Button_Playstore"
              href="https://play.google.com/store/apps/details?id=ai.mayamd.mayaedu"
              target="__blank"
            >
              <CImg
                src={img.playStoreIcon}
                width={17}
                height={17}
                className="Svg_Playstore"
              />
              {googlePay}
            </Button>
            <Button
              color="primary"
              className="Button_Playstore"
              href="https://apps.apple.com/us/app/maya-edu/id1453506418"
              target="__blank"
            >
              <CImg
                src={img.appStoreIcon}
                width={20}
                height={20}
                className="Svg_Playstore"
              />
              {appStore}
            </Button>
          </div>
        </div>
        <div className="col-md-6 justify-content-center justify-content-sm-end">
          <div>
            <div className="px-2 text-center" style={{ paddingTop: '30px' }}>
              <div className="pb-2">
                <a
                  className="text-decoration-none text-white Font-Size--16px"
                  href="https://www.mayamd.ai/about"
                  target="__blank"
                >
                  About Us
                </a>
              </div>
              <div
                role="button"
                onClick={() => {
                  settermConditionVisible(true);
                }}
                className="text-white Font-Size--16px pb-2"
              >
                {'Terms & Conditions'}
              </div>
              {!restProps.isLogin && (
                <div className="pb-2">
                  <Link
                    className="text-decoration-none text-white Font-Size--16px"
                    to={endpoints.contactUs}
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-white Font-Size--14px pt-4 pb-2">
        {copyright}
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
