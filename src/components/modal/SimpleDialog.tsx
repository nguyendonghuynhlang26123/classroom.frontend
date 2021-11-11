import { Modal, Box, Typography } from '@mui/material';
import React from 'react';
import { simpleDialogStyle } from './style';
import { SimpleDialogPropsType } from './type';

export const SimpleDialog = ({ open, handleClose, title, children, ...props }: SimpleDialogPropsType) => {
  return (
    <Modal keepMounted open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={simpleDialogStyle.root} {...props}>
        <Typography id="modal-modal-title" sx={simpleDialogStyle.title} gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};
