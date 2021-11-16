import {
  Container,
  Grow,
  Paper,
  Typography,
  Box,
  Button,
  Link,
  Stack,
  TextField,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import { sharedStyleSx } from './style';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from 'components';
import { NAME_REGEX } from 'common/constants/regex';
import { RegisterData } from 'common/interfaces';
import { useAppDispatch } from 'store/hooks';
import { showMessage } from 'store/slices';

const validationSchema = yup.object({
  email: yup.string().email('This field should be a valid email').required('Please enter email'),
  first_name: yup
    .string()
    .matches(NAME_REGEX, 'No special characters, and 1 word allow')
    .required('Firstname is required'),
  last_name: yup
    .string()
    .matches(NAME_REGEX, 'No special characters, and 1 word allow')
    .required('Lastname is rquired'),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please enter password confirmation'),
});

type FormType = RegisterData & {
  passwordConfirm?: string;
};

const RegisterPage = () => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const formik = useFormik<FormType>({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      passwordConfirm: '',
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);

      const bodyData: FormType = { ...values };
      delete bodyData.passwordConfirm;
      if (register)
        register(bodyData)
          .then(() => {
            setLoading(false);
            dispatch(
              showMessage({
                message: 'Registeration completed',
                type: 'success',
              }),
            );
            // navigate('/' + search);
          })
          .catch((response) => {
            setLoading(false);
            dispatch(showMessage({ message: response.message, type: 'error' }));
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
            <Typography variant="h2">🎓</Typography>
            <Typography variant="h5">Moorssalc</Typography>
            <Typography variant="body1">Sign up</Typography>

            <Box component="form" noValidate autoComplete="off" sx={sharedStyleSx.form} onSubmit={formik.handleSubmit}>
              <Stack direction="row" gap={3}>
                <TextField
                  id="first_name"
                  name="first_name"
                  label="Firstname"
                  fullWidth
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                  helperText={formik.touched.first_name && formik.errors.first_name}
                />
                <TextField
                  id="last_name"
                  name="last_name"
                  label="Lastname "
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                  error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                  helperText={formik.touched.last_name && formik.errors.last_name}
                />
              </Stack>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="off"
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
                autoComplete="off"
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
                type="password"
                fullWidth
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
              />
              <Button
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                aria-label="login btn"
                endIcon={loading && <CircularProgress size={16} />}
                disabled={loading}
              >
                Sign up
              </Button>
            </Box>
            <Stack direction="row" sx={sharedStyleSx.signUpContainer}>
              <Typography variant="body1">Already have account?</Typography>
              <Link onClick={goToLogin}>Log in</Link>
            </Stack>
          </Paper>
        </Container>
      </Grow>
    </Box>
  );
};

export default RegisterPage;
