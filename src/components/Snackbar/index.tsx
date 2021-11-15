import { Alert, Slide, Snackbar } from '@mui/material';
import React from 'react';
import { SnackbarProps } from './type';

export const NotificationSnackbar = ({ open, msg, severity = 'success', handleClose }: SnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
      sx={{ minWidth: '300px' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>
  );
};
