import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function withProvider(providerInfo, Component) {
  const { getResourcesAction, subscribeKey } = providerInfo || {};
  function ComponentWithProvider({
    resources, isReadonly,
    getResourcesAction: _getResourcesAction,
    formatValues,
    ...restProps
  }) {
    const [text, setText] = useState('');
    const { isFetching, info } = resources;
    let dropListValues = info || [];
    function fetchResources(query = {}) {
      const _query = { ...query };
      _getResourcesAction(_query);
    }

    useEffect(() => {
      if (!isReadonly && !restProps.disabled) {
        setText('');
        if (text) {
          fetchResources({
            ...restProps.query, term: text,
          });
        }
      }
    }, []);

    useEffect(() => {
      if (restProps.query && !restProps.disabled) {
        fetchResources({ ...restProps.query });
      }
    }, [restProps.query, restProps.disabled]);

    function handleTextChange(event) {
      const { value } = event.target;
      setText(value);
      let _query = { term: value };
      if (restProps.query) {
        _query = { ..._query, ...restProps.query };
      }
      fetchResources(_query);
    }

    if (formatValues) {
      dropListValues = formatValues(dropListValues);
    }

    return (
      <Component
        isSearchEnable
        isReadonly={isReadonly}
        onTextChange={handleTextChange}
        isFetching={isFetching}
        dropListValues={dropListValues}
        setText={setText}
        {...restProps}
        text={text}
      />
    );
  }
  ComponentWithProvider.defaultProps = {
    query: false,
    isReadonly: false,
    formatValues: false,
  };
  ComponentWithProvider.propTypes = {
    getResourcesAction: PropTypes.func.isRequired,
    resources: PropTypes.object.isRequired,
    isReadonly: PropTypes.bool,
    query: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    formatValues: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  };

  function mapStateToProps(state) {
    return { resources: state[subscribeKey] };
  }
  return connect(
    mapStateToProps,
    { getResourcesAction },
  )(ComponentWithProvider);
}

export default withProvider;
