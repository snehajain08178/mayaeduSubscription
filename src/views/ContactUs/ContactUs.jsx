import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveContactUs } from '../../redux/actions/contactUs';
import Form from './Form';
import './contact.scss';
import SuccessCard from './SuccessCard';

function ContactUs({ saveContactUs: saveContactUsAction, contactUs }) {
  const [isSuccess, setSuccess] = useState(false);
  const { isFetching } = contactUs;
  const handleSubmit = (val) => {
    saveContactUsAction(val, () => {
      setSuccess(true);
    });
  };
  return (
    <div className="View__ContactUs">
      <div className="background background--color">
      <div className="Pt--130"></div>
      <div className="container">
        <div className="View__ContactUs__Header text-center p-5">
          <h1 className="Font-Size--Header text-white">Contact Us</h1>
        </div>
        {!isSuccess ? (
          <Form onSubmit={handleSubmit} isFetching={isFetching} />
        ) : (
          <SuccessCard />
        )}
      </div>
      </div>
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
