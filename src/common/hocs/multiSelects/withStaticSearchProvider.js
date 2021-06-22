import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function withStaticSearchProvider(_dropListValues, Component) {
  function ComponentWithProvider({ isReadonly, formatValues, ...restProps }) {
    const [text, setText] = useState('');
    const [dropListValues, setDroplistValues] = useState(
      _dropListValues
    );
    useEffect(() => {
      if (!isReadonly && !restProps.disabled) {
        setText('');
      }
    }, []);

    React.useEffect(() => {
      if (!text) {
        setDroplistValues(_dropListValues);
      }
    }, [text]);

    function handleTextChange(event) {
      const { value } = event.target;
      const filterValue = _dropListValues.filter((val) => val.name
        .toLocaleLowerCase()
        .trim()
        .includes(event.target.value.toLocaleLowerCase().trim()));
      setDroplistValues(filterValue);
      setText(value);
    }

    if (formatValues) {
      setDroplistValues(formatValues(dropListValues));
    }

    return (
      <Component
        isSearchEnable
        isReadonly={isReadonly}
        onTextChange={handleTextChange}
        dropListValues={dropListValues}
        setText={setText}
        {...restProps}
        text={text}
      />
    );
  }
  ComponentWithProvider.defaultProps = {
    isReadonly: false,
    formatValues: false,
  };
  ComponentWithProvider.propTypes = {
    isReadonly: PropTypes.bool,
    formatValues: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  };

  return ComponentWithProvider;
}

export default withStaticSearchProvider;
