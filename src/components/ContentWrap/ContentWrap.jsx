import React from 'react';
import PropTypes from 'prop-types';
import loaderImage from '../../assets/img';

export default function ContentWrap({
  isFetching, isError, children,
}) {
  if (isError) {
    return (<div className="ContentWrap">Something went wrong...</div>);
  }

  if (isFetching) {
    return (
      <div className="ContentWrap">
        <img src={loaderImage} alt="loading..." />
      </div>
    );
  }
  return children;
}

ContentWrap.defaultProps = {
  isError: false,
};

ContentWrap.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
