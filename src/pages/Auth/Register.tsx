import { Container, Grow, Paper, Typography, Box, Button, Link, Stack, TextField } from '@mui/material';
import React from 'react';
import { sharedStyleSx } from './style';
import { useFormik } from 'formik';
import * as yup from 'yup';

const GG_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY as string;

const validationSchema = yup.object({
  email: yup.string().email('This field should be a valid email').required('Please enter email'),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <Box sx={sharedStyleSx.root}>
      <Grow appear={true} in={true} timeout={500}>
        <Container sx={sharedStyleSx.container}>
          <Paper elevation={4} square sx={sharedStyleSx.paper}>
            <Typography variant="h2">🎓</Typography>
            <Typography variant="h5">Classroom</Typography>
            <Typography variant="body1">Sign up</Typography>

            <Box component="form" noValidate autoComplete="off" sx={sharedStyleSx.form} onSubmit={formik.handleSubmit}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                id="passwordConfirm"
                name="passwordConfirm"
                label="Confirm password"
                type="passwordConfirm"
                fullWidth
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
              />
              <Button fullWidth type="submit" size="large" variant="contained" aria-label="login btn">
                Sign in
              </Button>
            </Box>
            <Stack direction="row" sx={sharedStyleSx.signUpContainer}>
              <Typography variant="body1">Already have account?</Typography>
              <Link>Log in</Link>
            </Stack>
          </Paper>
        </Container>
      </Grow>
    </Box>
  );
};

export default RegisterPage;
