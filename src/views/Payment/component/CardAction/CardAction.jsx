import { CImg } from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';
import img from '../../../../assets/img';
import Radio from '../../../../components/Radio/Radio';
import { getCardNumberFormat } from '../../../../helpers/collecionUtils';
import './card.scss';

const CardAction = ({
  details,
  onChange,
  checked,
  name,
  onDeleteClick,
}) => {
  const {
    card, id, isDefault
  } = details || {};
  function handleDeleteClick() {
    onDeleteClick(card.fingerprint);
  }
  return (
    <div className="w-100 mt-4">
        <div className="w-75 mx-auto Border-radius bg-white row d-flex align-items-center shadow-sm py-1">
          <div className="col-2">
            {!isDefault && (
              <CImg
                src={img.deleteIcon}
                width={20}
                height={20}
                onClick={handleDeleteClick}
              />
            )}
          </div>
          <div className="col-8">
            <div className="">XXXX XXXX XXXX {card.last4}</div>
            <div className="">
              {' '}
              Valid Till: {' '}
              {getCardNumberFormat(
                card && card.exp_month,
                card && card.exp_year
              ) || 'NA'}
            </div>
          </div>
          <div className="col-2 justify-content-center d-flex mb-2">
            <Radio
              name={name}
              checked={checked}
              onChange={onChange}
              value={id}
              id={id}
            />
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
  onDeleteClick: PropTypes.func.isRequired,
};

export default CardAction;
