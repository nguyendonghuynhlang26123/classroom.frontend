import { Box, Button, CircularProgress, Grow, Modal, Paper, TextField, Typography } from '@mui/material';
import { IChangePassBody } from 'common/interfaces';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { changePassSx } from './style';
import { ChangePassBtnPropType } from './type';

const validationSchema = yup.object({
  old_password: yup
    .string()
    .required('Please enter your current password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  new_password: yup
    .string()
    .required('Please Enter your new password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Confirm password must match')
    .required('Please enter password confirmation for your new password'),
});

export const ChangePassBtn = ({ loading, handleSubmit }: ChangePassBtnPropType) => {
  const [modal, showModal] = React.useState<boolean>(false);
  const formik = useFormik<IChangePassBody>({
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values)
        .then(() => {
          formik.resetForm();
          showModal(false);
        })
        .catch((err) => {
          formik.setFieldError('old_password', 'Invalid password');
        });
    },
  });
  return (
    <>
      <Button onClick={() => showModal(true)}>Change pass</Button>
      <Modal
        sx={changePassSx.root}
        open={modal}
        onClose={() => showModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grow in={modal} timeout={500}>
          <Paper elevation={4} square sx={changePassSx.container}>
            <Box component="form" noValidate autoComplete="off" sx={changePassSx.form}>
              <Typography variant="body1" className="header">
                Update passwords
              </Typography>
              <TextField
                id="old_password"
                name="old_password"
                label="Enter current Password"
                type="password"
                autoComplete="off"
                fullWidth
                value={formik.values.old_password}
                onChange={formik.handleChange}
                error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                helperText={formik.touched.old_password && formik.errors.old_password}
              />
              <TextField
                id="new_password"
                name="new_password"
                label="Enter New Password"
                type="password"
                autoComplete="off"
                fullWidth
                value={formik.values.new_password}
                onChange={formik.handleChange}
                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                helperText={formik.touched.new_password && formik.errors.new_password}
              />
              <TextField
                id="confirm_password"
                name="confirm_password"
                label="Confirm password"
                type="password"
                fullWidth
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
              />
            </Box>

            <Button
              fullWidth
              size="large"
              variant="contained"
              aria-label="login btn"
              onClick={() => formik.submitForm()}
              endIcon={loading && <CircularProgress size={16} />}
              disabled={loading}
            >
              Change pass
            </Button>
          </Paper>
        </Grow>
      </Modal>
    </>
  );
};
