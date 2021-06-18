import { CImg } from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';
import img from '../../../../assets/img';

const Card = ({ details }) => {
  const { card, billing_details } = details || {};
  return (
    <div className="w-100">
      <div className="container bg-primary text-white font-weight-bold rounded shadow w-75">
        <div className="row">
          <div className="col-8">
            <div className="p-2">
              <CImg src={img.chipIcon} width={40} height={30} />
            </div>
            <div className="p-2">XXXX XXXX XXXX {card.last4}</div>
            <div className="p-2">
              {(billing_details && billing_details.name) || 'NA'}
            </div>
            <div className="p-2 pb-4">
              {' '}
              Valid Till: {(card && card.exp_month) || 'NA'}
              {' / '}
              {(card && card.exp_year) || 'NA'}
            </div>
          </div>
          <div className="col-4 justify-content-end d-flex">
            <CImg
              className="mt-2 ml-lg-2"
              src={img.cardsIcon.master}
              width={40}
              height={25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Card.defaultProps = {
  details: {},
};

Card.propTypes = {
  details: PropTypes.object.isRequired,
};

export default Card;
