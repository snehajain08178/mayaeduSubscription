import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveContactUs } from '../../redux/actions/contactUs';
import { notify } from '../../redux/actions/notification';
import Form from './Form';
import './contact.scss';
import SuccessCard from './SuccessCard';
import '../../scss/styles.scss';

function ContactUs({ saveContactUs: saveContactUsAction, contactUs, notify: notifyAction }) {
  const [isSuccess, setSuccess] = useState(false);
  const { isProcessing: isFetching } = contactUs;
  const handleSubmit = (val) => {
    saveContactUsAction(val, () => {
      setSuccess(true);
    });
  };
  return (
    <div className="View__ContactUs">
        {!isSuccess ? (
          <Form onSubmit={handleSubmit} isFetching={isFetching} notify={notifyAction} />
        ) : (
          <SuccessCard />
        )}
    </div>
  );
}

ContactUs.propTypes = {
  saveContactUs: PropTypes.func.isRequired,
  contactUs: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,
};

function mapStateToProps({ contactUs }) {
  return { contactUs };
}

export default connect(mapStateToProps, { saveContactUs, notify })(ContactUs);
