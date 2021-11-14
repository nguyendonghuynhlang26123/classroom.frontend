import React from 'react';
import { settingModalSx } from './style';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Grow, IconButton, Modal, Toolbar, Typography, Container, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
    .max(50, 'Section should be of 1-50 characters length'),
  subject: yup
    .string()
    .min(1, 'Subject should be of 1-50 characters length')
    .max(50, 'Subject should be of 1-50 characters length'),
  room: yup
    .string()
    .min(1, 'Room should be of 1-50 characters length')
    .max(50, 'Room should be of 1-50 characters length'),
});
export const ClassroomSetting = ({}) => {
  const [modal, showModal] = React.useState<boolean>(false);
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

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => showModal(true)}
        color="inherit"
      >
        <SettingsIcon sx={{ fontSize: 24 }} />
      </IconButton>

      <Modal
        open={modal}
        onClose={() => showModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grow in={modal} timeout={300}>
          <Box sx={settingModalSx.root}>
            <Toolbar sx={settingModalSx.toolbar}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="close modal"
                onClick={() => showModal(false)}
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <Typography variant="body1">Classroom setting</Typography>

              <Button variant="contained">Save</Button>
            </Toolbar>

            <Container maxWidth={false} sx={settingModalSx.container}>
              <Box
                sx={settingModalSx.form}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
              >
                <Typography color="primary">Class Details</Typography>
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
        </Grow>
      </Modal>
    </>
  );
};
