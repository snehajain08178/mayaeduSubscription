import { CImg, CInputRadio } from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';
import img from '../../../../assets/img';

const CardAction = ({
  details, onChange, checked, name
}) => {
  const { card, billing_details, id } = details || {};
  return (
    <div className="w-100 mt-4">
      <div className="container text-primary font-weight-bold rounded shadow-sm w-75">
        <div className="row d-flex align-items-center">
          <div className="col-2">
            <CImg src={img.deleteIcon} width={20} height={20} />
          </div>
          <div className="col-8">
            <div className="">XXXX XXXX XXXX {card.last4}</div>
            <div className="">
              {(billing_details && billing_details.name) || 'NA'}
            </div>
            <div className="">
              {' '}
              Valid Till: {(card && card.exp_month) || 'NA'}
              {' / '}
              {(card && card.exp_year) || 'NA'}
            </div>
          </div>
          <div className="col-2 justify-content-end d-flex">
            <CInputRadio
              name={name}
              checked={checked}
              onChange={onChange}
              value={id}
              id={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

CardAction.propTypes = {
  details: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.string.isRequired,
};

export default CardAction;
