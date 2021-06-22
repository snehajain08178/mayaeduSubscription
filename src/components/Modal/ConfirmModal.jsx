import React from 'react';
import PropTypes from 'prop-types';
import {
  CButton, CModal, CModalBody, CModalFooter
} from '@coreui/react';

function ConfirmModal({
  onCancel, onSubmit, isVisible, content, isSubmit, submitLabel
}) {
  return (
    <CModal
      show={isVisible}
      onClose={onCancel}
      color="primary"
      centered
      size="sm"
    >
      <CModalBody className="font-weight-bold text-center">{content}</CModalBody>
      <CModalFooter>
        {
          isSubmit &&
          (<CButton color="primary" onClick={onSubmit}>
            {'Confirm' || submitLabel}
        </CButton>)}
          <CButton color="secondary" onClick={onCancel}>
            Cancel
        </CButton>
        </CModalFooter>
    </CModal>
  );
}

ConfirmModal.defaultProps = {
  isVisible: false,
  content: '',
  isSubmit: true,
  submitLabel: ''
};

ConfirmModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  content: PropTypes.string,
  isSubmit: PropTypes.bool,
  submitLabel: PropTypes.string,
};

export default ConfirmModal;
