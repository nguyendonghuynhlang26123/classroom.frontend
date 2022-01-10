import { Box, Button, CircularProgress, Container, Grow, Link, Paper, Stack, TextField, Typography, Zoom } from '@mui/material';
import ResetPassImg from 'assets/images/reset-pass.svg';
import { useAuth } from 'components';
import { useFormik } from 'formik';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { repository } from 'services/repository';
import * as yup from 'yup';
import { sharedStyleSx } from './style';

const validationSchema = yup.object({
  email: yup.string().email('This field should be a valid email').required('Please enter email'),
});

type FormType = {
  email: string;
};

const ResetPassword = () => {
  const { search } = useLocation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [completed, setCompleted] = React.useState<boolean>(false);
  const formik = useFormik<FormType>({
    initialValues: {
      email: '',
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      if (values.email)
        repository
          .post('/auth/reset_password', { email: values.email })
          .then(() => {
            setLoading(false);
            toast.success('Registeration completed');
            // navigate('/' + search);
            setCompleted(true);
          })
          .catch((response) => {
            setLoading(false);
            formik.setFieldError('email', response.message);
            toast.error(`Register failed! Message: ${response.message}`);
          });
    },
  });

  const goToLogin = () => {
    navigate('/auth/login' + search);
  };

  return (
    <Box sx={sharedStyleSx.root}>
      <Grow appear={true} in={true} timeout={500}>
        <Container sx={sharedStyleSx.container}>
          <Paper elevation={4} square sx={sharedStyleSx.paper}>
            {completed && (
              <Zoom in={completed}>
                <Box sx={sharedStyleSx.imgContainer}>
                  <img alt="Reset account image" src={ResetPassImg} />

                  <Typography variant="h6">Check your email</Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    We have reset your account and sent it to your email! Please check it and login again!
                  </Typography>
                  <Button fullWidth type="submit" size="small" variant="contained" aria-label="navigate btn" onClick={goToLogin}>
                    Login now
                  </Button>
                </Box>
              </Zoom>
            )}

            {!completed && (
              <Zoom in={completed}>
                <>
                  <Typography variant="h2">🎓</Typography>
                  <Typography variant="h5">Moorssalc</Typography>
                  <Typography variant="body1">Reset password</Typography>
                  <Box component="form" noValidate autoComplete="off" sx={sharedStyleSx.form} onSubmit={formik.handleSubmit}>
                    <TextField
                      id="email"
                      name="email"
                      label="My email"
                      type="email"
                      autoComplete="off"
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <Button
                      fullWidth
                      type="submit"
                      size="large"
                      variant="contained"
                      aria-label="reset btn"
                      endIcon={loading && <CircularProgress size={16} />}
                      disabled={loading}
                    >
                      Reset my account
                    </Button>
                  </Box>
                  <Stack direction="row" sx={sharedStyleSx.signUpContainer}>
                    <Typography variant="body1">Ready to login?</Typography>
                    <Link onClick={goToLogin}>Go to login page</Link>
                  </Stack>
                </>
              </Zoom>
            )}
          </Paper>
        </Container>
      </Grow>
    </Box>
  );
};

export default ResetPassword;
