import React from 'react';

function withPropProvider(Component, restProps) {
  function ComponentWithPropAccess(props) {
    return (
      <>
        <Component {...props} {...restProps} />
      </>
    );
  }

  return ComponentWithPropAccess;
}

export default withPropProvider;
