import React from 'react';
import PropTypes from 'prop-types';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react';

/**
 * @componentName Modal
 * overrided.
 */
function Modal({
  show, onClose, title, children
}) {
  return (
    <CModal show={show} onClose={() => onClose()}>
    <CModalHeader closeButton>
      <CModalTitle>
        {title}
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      {children}
    </CModalBody>
  </CModal>
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string
};

Modal.defaultProps = {
  title: '',
  show: false
};

export default React.memo(Modal);
