import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import { SimpleModal } from 'components';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { formSx } from './style';
import { RequestFormProps } from './type';

export const RequestForm = ({ open, assignment, handleClose, onSubmit }: RequestFormProps) => {
  const validationSchema = yup.object({
    message: yup.string().required('Reason is required'),
    expect_mark: yup.number().max(assignment.total_points, 'Invalid expect grade').required('Expected grade is required'),
  });

  const formik = useFormik({
    initialValues: {
      expect_mark: '',
      message: '',
    },
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values.message, Number(values.expect_mark));
      formik.resetForm();
      handleClose();
    },
  });

  return (
    <SimpleModal open={open} handleClose={handleClose} title={'Request a grade review'} width={350}>
      <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit} sx={formSx.root}>
        <TextField
          id="expect_mark"
          name="expect_mark"
          label="What is your expected grade"
          variant="filled"
          type="number"
          fullWidth
          value={formik.values.expect_mark}
          onChange={formik.handleChange}
          error={formik.touched.expect_mark && Boolean(formik.errors.expect_mark)}
          helperText={formik.touched.expect_mark && formik.errors.expect_mark}
          InputProps={{
            endAdornment: <InputAdornment position="end">/{assignment.total_points}</InputAdornment>,
          }}
        />
        <TextField
          id="message"
          name="message"
          label="Your reason?"
          variant="filled"
          fullWidth
          multiline
          rows={4}
          value={formik.values.message}
          onChange={formik.handleChange}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={formSx.btns}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </SimpleModal>
  );
};
