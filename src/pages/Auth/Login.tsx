import { Container, Grow, Paper, Typography, Box, Button, Divider, Link, Stack, TextField } from '@mui/material';
import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { sharedStyleSx } from './style';
import FacebookIcon from 'assets/images/fb.svg';
import GoogleIcon from 'assets/images/gg.svg';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const GG_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY as string;

const validationSchema = yup.object({
  email: yup.string().email('This field should be a valid email').required('Please enter email'),
  password: yup.string().required('Please Enter your password'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, loaded } = useGoogleLogin({
    clientId: GG_API_KEY,
    isSignedIn: true,
    cookiePolicy: 'single_host_origin',
    loginHint: 'Login with google',
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  const onGoogleResponse = (success = true) => {
    console.log(success);
  };

  const signUpOnClick = () => {
    navigate('/auth/register');
  };

  return (
    <Box sx={sharedStyleSx.root}>
      <Grow appear={true} in={true} timeout={500}>
        <Container sx={sharedStyleSx.container}>
          <Paper elevation={4} square sx={sharedStyleSx.paper}>
            <Typography variant="h2">🎓</Typography>
            <Typography variant="h5">Classroom</Typography>
            <Typography variant="body1">Sign in </Typography>

            <Box component="form" noValidate autoComplete="off" sx={sharedStyleSx.form} onSubmit={formik.handleSubmit}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                autoComplete="off"
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
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button fullWidth type="submit" size="large" variant="contained" aria-label="login with credentials">
                Sign in
              </Button>
            </Box>
            <Stack direction="row" sx={sharedStyleSx.signUpContainer}>
              <Typography variant="body1">Don't have account?</Typography>
              <Link onClick={signUpOnClick}>Sign up</Link>
            </Stack>
            <Divider flexItem sx={sharedStyleSx.divider}>
              or
            </Divider>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              aria-label="Sign in with Google"
              color="error"
              startIcon={<img src={GoogleIcon} alt="Google Icon" />}
            >
              Login with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              aria-label="Sign in with Facebook"
              color="primary"
              startIcon={<img src={FacebookIcon} alt="Facebook Icon" />}
            >
              Login with Facebook
            </Button>
          </Paper>
        </Container>
      </Grow>
    </Box>
  );
};

export default LoginPage;
