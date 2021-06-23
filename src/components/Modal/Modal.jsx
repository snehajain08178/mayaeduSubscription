import React from 'react';
import PropTypes from 'prop-types';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody
} from '@coreui/react';

/**
 * @componentName Modal
 * overrided.
 */
function Modal({
  show, onClose, title, children, closeButton
}) {
  return (
    <CModal show={show} onClose={() => onClose()}>
      {title &&
        <CModalHeader closeButton={closeButton}>
          <CModalTitle>
            {title}
          </CModalTitle>
        </CModalHeader>
      }
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
  title: PropTypes.string,
  closeButton: PropTypes.bool,
};

Modal.defaultProps = {
  title: '',
  show: false,
  closeButton: true
};

export default React.memo(Modal);
