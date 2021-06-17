import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { redirectTo } from 'libs/common';
import Form from './Form';
import './signup.scss';
import { signUpUser } from '../../redux/actions/auth';
import endpoints from '../../routes/endpoints';

function SignUp(props) {
  const { history, auth } = props;
  const { isProcessing } = auth;
  function handleSignUpSubmit(values) {
    props.signUpUser(values, () => {
      redirectTo(history, endpoints.dashboard);
    });
  }

  return (
    <div className="View__SignUp">
      <Form
        onSubmit={handleSignUpSubmit}
        isProcessing={isProcessing}
      />
    </div>
  );
}

SignUp.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signUpUser })(SignUp);
