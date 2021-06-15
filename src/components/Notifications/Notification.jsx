import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './notification.scss';
import { ToastContainer, toast as toastUtil } from 'react-toastify';
import { closeNotification } from '../../redux/actions/notification';
import 'react-toastify/dist/ReactToastify.css';

function Notification({ messages = {}, isReset }) {
  const { isError, message } = messages;

  const notify = () => toastUtil.success(
    <div>
      <div className={`header ${isError ? 'error' : 'sucess'}`}>{ isError ? 'Error' : 'Success'}</div>
      <div className="description">{ message }</div>
    </div>
  );

  useEffect(() => {
    if (isReset) {
      toastUtil.dismiss();
    }
  }, [isReset]);

  useEffect(() => {
    if (Object.keys(messages).length) {
      notify(message);
    }
  }, [messages]);

  return (
    <div>
      <ToastContainer
        autoClose={3000}
        limit={1}
      />
    </div>
  );
}

Notification.propTypes = {
  messages: PropTypes.object.isRequired,
  isReset: PropTypes.bool.isRequired,
  closeNotification: PropTypes.func.isRequired,
};

function mapStateToProps({ notification }) {
  return { messages: notification.messages, isReset: notification.isReset };
}

export default connect(mapStateToProps, { closeNotification })(Notification);
