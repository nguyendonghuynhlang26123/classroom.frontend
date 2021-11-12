import { Box, Container, Paper, Typography, TextField, Divider, Button, Link, Grow, Stack } from '@mui/material';
import React from 'react';
import { loginSx, pageStyle } from './style';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useGoogleLogin } from 'react-google-login';
import GoogleIcon from 'assets/images/gg.svg';
import FacebookIcon from 'assets/images/fb.svg';

const GG_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY as string;

const validationSchema = yup.object({
  email: yup.string().email('This field should be a valid email').required('Please enter email'),
  password: yup.string().required('Please Enter your password'),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
  // ),
});
const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  const { signIn, loaded } = useGoogleLogin({
    clientId: GG_API_KEY,
    isSignedIn: true,
    cookiePolicy: 'single_host_origin',
    loginHint: 'Login with google',
  });

  const onGoogleResponse = (success = true) => {
    console.log(success);
  };

  return (
    <div style={pageStyle}>
      <Grow appear={true} in={true} timeout={500}>
        <Container sx={loginSx.root}>
          <Paper elevation={4} square sx={loginSx.container}>
            <Typography variant="h2">🎓</Typography>
            <Typography variant="h5">Classroom</Typography>
            <Typography variant="body1">Sign in </Typography>
            <Box component="form" noValidate autoComplete="off" sx={loginSx.form} onSubmit={formik.handleSubmit}>
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
              <Button fullWidth type="submit" size="large" variant="contained" aria-label="login with credentials">
                Sign in
              </Button>
            </Box>
            <Stack direction="row" sx={loginSx.signUpContainer}>
              <Typography variant="body1">Don't have account?</Typography>
              <Link href="./register">Sign up</Link>
            </Stack>
            <Divider flexItem sx={loginSx.divider}>
              or
            </Divider>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              aria-label="Sign in with Google"
              color="error"
              sx={loginSx.btn}
              startIcon={<img src={GoogleIcon} />}
            >
              Login with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              aria-label="Sign in with Facebook"
              color="primary"
              sx={loginSx.btn}
              startIcon={<img src={FacebookIcon} />}
            >
              Login with Facebook
            </Button>
          </Paper>
        </Container>
      </Grow>
    </div>
  );
};

export default LoginPage;
