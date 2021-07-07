import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveContactUs } from '../../redux/actions/contactUs';
import Form from './Form';
import './contact.scss';
import SuccessCard from './SuccessCard';
import '../../scss/styles.scss';

function ContactUs({ saveContactUs: saveContactUsAction, contactUs }) {
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
          <Form onSubmit={handleSubmit} isFetching={isFetching} />
        ) : (
          <SuccessCard />
        )}
    </div>
  );
}

ContactUs.propTypes = {
  saveContactUs: PropTypes.func.isRequired,
  contactUs: PropTypes.object.isRequired,
};

function mapStateToProps({ contactUs }) {
  return { contactUs };
}

export default connect(mapStateToProps, { saveContactUs })(ContactUs);
