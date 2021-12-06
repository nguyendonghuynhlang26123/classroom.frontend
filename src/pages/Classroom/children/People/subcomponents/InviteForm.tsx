import React from 'react';
import { Typography, Box, Stack, Button, TextField } from '@mui/material';
import { SimpleModal } from 'components';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email().required('Email is required'),
});

type InviteFormProps = {
  open: boolean;
  title: string;
  description: any;
  handleClose: () => void;
  onSubmit: (email: string) => void;
};

export const InviteForm = ({ open, description, title, handleClose, onSubmit }: InviteFormProps) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values.email);
    },
  });

  return (
    <SimpleModal open={open} handleClose={handleClose} title={title} width={350}>
      <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        {description}
        <TextField
          id="email"
          name="email"
          label="Enter email"
          variant="standard"
          fullWidth
          sx={{ mt: 1, mb: 2 }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Invite</Button>
        </Stack>
      </Box>
    </SimpleModal>
  );
};
