import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { redirectTo } from 'libs/common';
import Form from './Form';

import { loginUser } from '../../redux/actions/auth';
import endpoints from '../../routes/endpoints';

function Login(props) {
  const { history, auth } = props;
  const { isProcessing } = auth;
  function handleLoginSubmit(values) {
    props.loginUser(values, () => {
      redirectTo(history, endpoints.plans);
    });
  }

  return (
    <div className="View__Login">
      <Form
        onSubmit={handleLoginSubmit}
        isProcessing={isProcessing}
      />
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { loginUser })(Login);
