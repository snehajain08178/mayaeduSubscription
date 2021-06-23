import React from 'react';
import PropTypes from 'prop-types';
import Card from './component/Card';
import CardAction from './component/CardAction';

const List = ({
  details, name, onChange, value, onDeleteClick
}) => {
  const { defaultCard, cardsList } = details || {};
  return (
    <div>
      <div>
        {defaultCard && Object.keys(defaultCard).length && (
          <Card details={defaultCard || {}} />
        )}
      </div>
      <div className="mt-4">
        {(cardsList && cardsList.length) ||
        (defaultCard && Object.keys(defaultCard).length) ? (
            [{ ...defaultCard, isDefault: true }, ...cardsList].map(
              (cardDetail, index) => (
              <CardAction
                key={index * 2 + 1}
                details={cardDetail}
                name={name}
                onChange={onChange}
                checked={value === cardDetail.id}
                onDeleteClick={onDeleteClick}
                isDefault={cardDetail.isDefault || false}
              />
              )
            )
          ) : (
          <div>
              <Card details={{
                card: {
                  last4: 'XXXX',
                  exp_month: '0',
                  exp_year: '0000',
                  warning: 'No card available!'
                }
              }} />
          </div>
          )}
      </div>
    </div>
  );
};

List.propTypes = {
  details: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default List;
