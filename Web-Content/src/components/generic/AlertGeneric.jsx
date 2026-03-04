import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertGeneric = ({ variant, message, setCustomAlert }) => {
  if (!message) {
    return null;
  }

  const closeAlertAndResetState = () => {
    setCustomAlert({ variant: '', message: '' });
  };

  return (
    <div>
      <Alert variant={variant} dismissible onClose={closeAlertAndResetState}>
        {message}
      </Alert>
    </div>
  );
};

export default AlertGeneric;
