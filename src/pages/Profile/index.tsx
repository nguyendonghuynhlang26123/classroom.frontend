import React from 'react';
import { Box, Typography, Container, TextField, Button, LinearProgress, Stack } from '@mui/material';
import { Navbar, useAuth } from 'components';
import { profileSx } from './style';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { drawerItemConfigs } from 'configs';
import { IUserBody } from 'common/interfaces';
import { NAME_REGEX, STUDENT_ID_REGEX } from 'common/constants/regex';
import { useUpdateProfileMutation } from 'services/api/user.api';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  first_name: yup.string().matches(NAME_REGEX, 'Invalid name').required('Firstname is required'),
  last_name: yup.string().matches(NAME_REGEX, 'Invalid name').required('Lastname is rquired'),
  avatar: yup.object().nullable(),
  student_id: yup.string().matches(STUDENT_ID_REGEX),
});

const UserProfile = () => {
  const { userData } = useAuth();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const formik = useFormik<IUserBody>({
    initialValues: {
      first_name: userData?.first_name || '',
      last_name: userData?.last_name || '',
      avatar: userData?.avatar || '',
      student_id: userData?.student_id || '',
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (userData) {
        updateProfile({ id: userData._id as string, body: values })
          .unwrap()
          .then(() => {
            toast.success('Update successfully');
          })
          .catch((err) => {
            if (err.status === 409) {
              formik.setFieldError('student_id', 'Student Id exists!');
            } else toast.error('Update failed!');
          });
      }
    },
  });

  return (
    <Box sx={profileSx.root}>
      <Navbar items={drawerItemConfigs} toolbarComponents={<>{isLoading && <LinearProgress />}</>}>
        <>
          <Typography variant="body1">Classroom setting</Typography>
          <Button
            variant="contained"
            onClick={() => {
              formik.submitForm();
            }}
          >
            Save
          </Button>
        </>
      </Navbar>

      <Container maxWidth={false} sx={profileSx.container}>
        <Box sx={profileSx.form} component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Typography sx={profileSx.form_title} color="primary">
            Profile
          </Typography>

          <TextField id="email" name="email" label="Email" fullWidth disabled value={userData?.email} />
          <Stack direction="row" sx={profileSx.stack}>
            <TextField
              id="first_name"
              name="first_name"
              label="First name (required)"
              fullWidth
              disabled={userData?.google_id !== null}
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={formik.touched.first_name && Boolean(formik.errors.first_name)}
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
            <TextField
              id="last_name"
              name="last_name"
              label="Lastname (required)"
              fullWidth
              disabled={userData?.google_id !== null}
              onChange={formik.handleChange}
              value={formik.values.last_name}
              error={formik.touched.last_name && Boolean(formik.errors.last_name)}
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
          </Stack>
          <TextField
            id="student_id"
            name="student_id"
            label="Student id"
            fullWidth
            value={formik.values.student_id}
            onChange={formik.handleChange}
            error={formik.touched.student_id && Boolean(formik.errors.student_id)}
            helperText={formik.touched.student_id && formik.errors.student_id}
          />
          <TextField
            id="avatar"
            name="avatar"
            label="Avatar URL"
            fullWidth
            disabled={userData?.google_id != null}
            onChange={formik.handleChange}
            value={formik.values.avatar || ''}
            error={formik.touched.avatar && Boolean(formik.errors.avatar)}
            helperText={formik.touched.avatar && formik.errors.avatar}
          />
          {userData?.google_id != null && (
            <Typography sx={profileSx.form_note} variant="body2">
              *You are linking your account with google, so please update your google account if you want to update your
              classroom account
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
