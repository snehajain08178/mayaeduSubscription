import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  CImg,
  CRow
} from '@coreui/react';
import SVG from '../../../../assets/img/svg';
import { dateFormat, timeFormat } from '../../../../libs/constants';
import { paymentFail, paymentFailMsg, paymentSuccessfulMsg } from '../../../../libs/strings';
import './paymentStatus.scss';
import Button from '../../../../components/Button';
import '../../../SignUp/signup.scss';

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
        <div>
            <h3 className="mt-4 text-center font-weight-bold">{status}</h3>
            <p className="mt-2 text-center paraTag">{moment(new Date()).format(dateFormat)}, {moment(new Date()).format(timeFormat)}</p>
            <p className="mt-5 text-center font-weight-bold paraTag">{status === paymentFail ? paymentFailMsg : paymentSuccessfulMsg}</p>
            <div className="d-flex justify-content-between align-items-center information_View">
                <div className="d-flex flex-column">
                    <p className="text-center font-weight-bold">Basic</p>
                    <p className="paraTag font-weight-bold">{planDuration}</p>
                </div>
                <div>
                    <p className="paraTag font-weight-bold">{currency} {amount}</p>
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
