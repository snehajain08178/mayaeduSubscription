import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

function ForgotPassword() {
  return (
    <div className="Login__Form">
        <Input
          labelText="Email Id"
          placeholder="Enter your registered email id here"
        />
        <Button
          label="Send recovery link"
          className="View__Login__Button"
        />
      </div>
  );
}

export default ForgotPassword;
