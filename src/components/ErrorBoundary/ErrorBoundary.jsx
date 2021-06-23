import React from 'react';
import PropTypes from 'prop-types';

/**
 * @componentName ErrorBoundary
 * @description Default component to be shown in case Application breaks.
 */
export default class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div align="center" justify="center" height="medium">
          <div>Something Went Wrong...</div>
        </div>
      );
    }
    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object.isRequired
};
