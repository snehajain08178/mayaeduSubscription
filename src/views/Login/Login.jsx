import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { redirectTo } from 'libs/common';
import Form from './Form';
import { loginUser } from '../../redux/actions/auth';
import endpoints from '../../routes/endpoints';
import './login.scss';

function Login(props) {
  const { history, auth } = props;
  const { isProcessing, isError } = auth;
  function handleLoginSubmit(values) {
    props.loginUser(values, () => {
      redirectTo(history, endpoints.profile);
    });
  }

  return (
    <div className="View__Login">
      <Form
        onSubmit={handleLoginSubmit}
        isProcessing={isProcessing}
        isError={isError}
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
