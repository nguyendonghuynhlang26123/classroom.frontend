import React from 'react';
import { Typography, Box, Stack, Button, TextField } from '@mui/material';
import { SimpleDialog } from 'components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { JoinFormProps } from './type';
import { formStyle } from './style';

const validationSchema = yup.object({
  code: yup
    .string()
    .min(6, 'Classroom Title should be of 6 characters length')
    .max(6, 'Classroom Title should be of 6 characters length')
    .matches(/^[ A-Za-z0-9]*$/, 'Alphabetical or numeral characters only!')
    .required('Classroom code is required'),
});

export const JoinForm = ({ open, handleClose, onSubmit }: JoinFormProps) => {
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <SimpleDialog open={open} handleClose={handleClose} title="Join classroom by code" width={300}>
      <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit} sx={formStyle.container}>
        <Typography variant="body2" gutterBottom component="p" sx={{ pb: 2 }}>
          Ask your teacher for the class code, then enter it here.
        </Typography>
        <TextField
          id="code"
          name="code"
          label="Class code (required)"
          fullWidth
          value={formik.values.code}
          onChange={formik.handleChange}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={handleClose}>Go back</Button>
          <Button type="submit">Continue</Button>
        </Stack>
      </Box>
    </SimpleDialog>
  );
};
