import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  CImg,
  CRow
} from '@coreui/react';
import SVG from '../../../../assets/img/svg';
import { dateFormat, timeFormat } from '../../../../libs/constants';
import {
  paymentFail, paymentFailMsg, paymentSuccessfulMsg, monthly, yearly
} from '../../../../libs/strings';
import './paymentStatus.scss';
import Button from '../../../../components/Button';
import '../../../SignUp/signup.scss';
import '../../../../scss/styles.scss';

const PaymentStatus = (
  {
    status, planDuration, amount, currency, onClick
  }
) => (
    <div className="d-flex justify-content-center align-items-center flex-column Payment_Status_View">
        <div className="mt-5">
            <CImg
                src={status === paymentFail ? SVG.crossIcon : SVG.tickIcon}
            />
        </div>
        <div style={{ width: '100%' }}>
            <p className="mt-4 text-center font-weight-bold Font-Size--16px">{status}</p>
            <p className="mt-2 text-center paraTag">{moment(new Date()).format(dateFormat)}, {moment(new Date()).format(timeFormat)}</p>
            <p className="mt-5 text-center font-weight-bold paraTag">{status === paymentFail ? paymentFailMsg : paymentSuccessfulMsg}</p>
            <div className="d-flex justify-content-between align-items-center information_View">
                <div className="d-flex flex-column">
                    <p className="text-center font-weight-bold Font-Size--16px">Basic</p>
                    <p className={`paraTag font-weight-bold text-capitalize ${status !== paymentFail ? 'Green' : 'Red'}`}>{planDuration === 'year' ? yearly : monthly}</p>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <CImg
                        src={currency === 'inr' ? status === paymentFail ? SVG.rupeeRedIcon : SVG.rupeeGreenIcon :
                          status === paymentFail ?
                            SVG.dollarRedIcon : SVG.dollarGreenIcon}
                    />
                    <p className={`Font-Size--22px font-weight-bold align-items-center align-self-center ${status !== paymentFail ? 'Green' : 'Red'}`}>{amount}</p>
                </div>
            </div>
        </div>
        <CRow className="my-4 justify-content-center">
            <Button
                color='primary'
                className="Button__Done"
                onClick={() => onClick()}
            >
                Done
            </Button>
        </CRow>
    </div>
);

export default PaymentStatus;

PaymentStatus.propTypes = {
  status: PropTypes.string,
  planDuration: PropTypes.string,
  amount: PropTypes.string,
  currency: PropTypes.currency,
  onClick: PropTypes.func
};
