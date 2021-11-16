import React from 'react';
import { Box, Typography, Container, TextField, Button, LinearProgress, Stack } from '@mui/material';
import { Navbar, useAuth } from 'components';
import { profileSx } from './style';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { drawerItemConfigs } from 'configs';
import { User } from 'common/interfaces';
import { NAME_REGEX, STUDENT_ID_REGEX } from 'common/constants/regex';

const validationSchema = yup.object({
  first_name: yup.string().matches(NAME_REGEX, 'Invalid name').required('Firstname is required'),
  last_name: yup.string().matches(NAME_REGEX, 'Invalid name').required('Lastname is rquired'),
  avatar: yup.object().nullable(),
  studentId: yup.string().matches(STUDENT_ID_REGEX),
});

const defaultData: User = {
  first_name: '',
  last_name: '',
  avatar: '',
  studentId: '',
  email: '',
};

const UserProfile = () => {
  const { userData } = useAuth();

  const formik = useFormik<User>({
    initialValues: {
      ...defaultData,
      ...userData,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log('log ~ file: index.tsx ~ line 39 ~ ClassroomSetting ~ values', values);
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <Box sx={profileSx.root}>
      <Navbar items={drawerItemConfigs} toolbarComponents={<>{loading && <LinearProgress />}</>}>
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

          <TextField id="email" name="email" label="Email" fullWidth disabled value={formik.values.email} />
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
            id="studentId"
            name="studentId"
            label="Student id"
            fullWidth
            value={formik.values.studentId}
            onChange={formik.handleChange}
            error={formik.touched.studentId && Boolean(formik.errors.studentId)}
            helperText={formik.touched.studentId && formik.errors.studentId}
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
