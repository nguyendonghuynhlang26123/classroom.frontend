import React from 'react';
import { Typography, Box, Stack, Button, TextField } from '@mui/material';
import { SimpleModal } from 'components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AcceptReviewFormType } from './type';

export const AcceptReviewForm = ({ handleClose, handleProceed, open, totalPoint, expectPoint }: AcceptReviewFormType) => {
  const validationSchema = yup.object({
    mark: yup.number().max(totalPoint).required('Final grade is required'),
  });
  const formik = useFormik({
    initialValues: {
      mark: expectPoint,
    },
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleProceed(values.mark);
      handleClose();
    },
  });

  return (
    <SimpleModal open={open} handleClose={handleClose} title={'Accept grade review'} width={450}>
      <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          By clicking 'Agree', you will change the current grade of this student for this assignment!
        </Typography>
        <TextField
          id="mark"
          name="mark"
          label="Final grading"
          variant="standard"
          fullWidth
          sx={{ mt: 1, mb: 2 }}
          type="number"
          value={formik.values.mark}
          onChange={formik.handleChange}
          error={formik.touched.mark && Boolean(formik.errors.mark)}
          helperText={formik.touched.mark && formik.errors.mark}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Agree</Button>
        </Stack>
      </Box>
    </SimpleModal>
  );
};
