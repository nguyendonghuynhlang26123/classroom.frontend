import React from 'react';
import { Box, Typography, Container, TextField, Button, LinearProgress } from '@mui/material';
import { Navbar } from 'components';
import { profileSx } from './style';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { drawerItemConfigs } from 'configs';
const validationSchema = yup.object({
  first_name: yup
    .string()
    .min(1, 'Classroom Title should be of 1-100 characters length')
    .max(100, 'Classroom Title should be of 1-100 characters length')
    .required('Classroom Title is required'),
  last_name: yup
    .string()
    .min(1, 'Section should be of 1-50 characters length')
    .max(50, 'Section should be of 1-50 characters length'),
  avatar: yup
    .string()
    .min(1, 'Subject should be of 1-50 characters length')
    .max(50, 'Subject should be of 1-50 characters length'),
  studentId: yup
    .string()
    .min(1, 'Room should be of 1-50 characters length')
    .max(50, 'Room should be of 1-50 characters length'),
});
const UserProfile = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      room: '',
      section: '',
      subject: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('log ~ file: index.tsx ~ line 39 ~ ClassroomSetting ~ values', values);
    },
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <Box sx={profileSx.root}>
      <Navbar items={drawerItemConfigs} toolbarComponents={<>{loading && <LinearProgress />}</>}>
        <>
          <Typography variant="body1">Classroom setting</Typography>
          <Button variant="contained">Save</Button>
        </>
      </Navbar>

      <Container maxWidth={false} sx={profileSx.container}>
        <Box sx={profileSx.form} component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Typography color="primary">Profile</Typography>
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
            label="Section"
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
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
