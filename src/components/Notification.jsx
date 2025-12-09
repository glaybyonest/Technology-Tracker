import React from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle
} from '@mui/material';

function Notification({ open, onClose, message, title, type = 'info', autoHideDuration = 4000 }) {
  const getAlertVariant = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiSnackbar-root': {
          '@media (max-width: 600px)': {
            bottom: 0,
            right: 0,
            left: 0
          }
        }
      }}
    >
      <Alert
        onClose={handleClose}
        severity={getAlertVariant(type)}
        variant="filled"
        sx={{
          width: '100%',
          minWidth: '300px',
          '@media (max-width: 600px)': {
            minWidth: '100%',
            borderRadius: 0
          }
        }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
