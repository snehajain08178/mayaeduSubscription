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
      <div className="mt-4 px-2">
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
            <h4 className="text-primary">No card available!</h4>
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
