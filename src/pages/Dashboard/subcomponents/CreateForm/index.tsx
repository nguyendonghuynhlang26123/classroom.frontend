import React from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
import { SimpleModal } from 'components';
import { formStyle } from './style';
import { FormModalProps } from './type';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  title: yup
    .string()
    .min(1, 'Classroom Title should be of 1-100 characters length')
    .max(100, 'Classroom Title should be of 1-100 characters length')
    .required('Classroom Title is required'),
  section: yup
    .string()
    .min(1, 'Section should be of 1-50 characters length')
    .max(50, 'Section should be of 1-50 characters length')
    .required('Section is required'),
  subject: yup.string().min(1, 'Subject should be of 1-50 characters length').max(50, 'Subject should be of 1-50 characters length'),
  room: yup.string().min(1, 'Room should be of 1-50 characters length').max(50, 'Room should be of 1-50 characters length'),
});

export const CreateForm = ({ open, handleClose, onSubmit }: FormModalProps) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      room: '',
      section: '',
      subject: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      handleClose();
    },
  });

  return (
    <SimpleModal open={open} handleClose={handleClose} title="Create class" width={500}>
      <Box component="form" noValidate autoComplete="off" sx={formStyle.container} onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          name="title"
          label="Class name (required)"
          variant="filled"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          id="section"
          name="section"
          label="Section (required)"
          variant="filled"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.section}
          error={formik.touched.section && Boolean(formik.errors.section)}
          helperText={formik.touched.section && formik.errors.section}
        />
        <TextField
          id="subject"
          name="subject"
          label="Subject"
          variant="filled"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.subject}
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
        />
        <TextField
          id="room"
          name="room"
          label="Room"
          variant="filled"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.room}
          error={formik.touched.room && Boolean(formik.errors.room)}
          helperText={formik.touched.room && formik.errors.room}
        />

        <Stack direction="row" spacing={2} marginTop={1} justifyContent="flex-end">
          <Button onClick={handleClose}>Go back</Button>
          <Button type="submit" onClick={() => {}}>
            Continue
          </Button>
        </Stack>
      </Box>
    </SimpleModal>
  );
};
