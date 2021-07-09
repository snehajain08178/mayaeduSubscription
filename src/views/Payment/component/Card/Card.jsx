import { CImg } from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';
import img from '../../../../assets/img';
import { getCardNumberFormat } from '../../../../helpers/collecionUtils';

const Card = ({ details }) => {
  const { card } = details || {};
  const { brand } = card || {};
  return (
    <div className="w-100" >
      <div className="bg-primary text-white font-weight-bold shadow w-80 Border-Radius--12px mx-auto" style={{ maxWidth: '320px' }}>
        <div className="row">
          <div className="col-8">
            <div className="p-2">
              <CImg src={img.chipIcon} width={40} height={30} />
            </div>
            <div className="p-2 mt-4">XXXX XXXX XXXX {card.last4}</div>
            <div className="p-2 pb-4">
              {' '}
              Valid Till:{' '}
              {getCardNumberFormat(
                card && card.exp_month,
                card && card.exp_year
              ) || 'NA'}
            </div>
            {card.warning && <div className="p-2">{card.warning}</div>}
          </div>
          <div className="col-4 justify-content-end d-flex">
            <CImg
              className="mt-2 ml-lg-2"
              src={img.cardsIcon[brand === 'visa' ? 'visa-white' : brand]}
              width={50}
              height={28}
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
