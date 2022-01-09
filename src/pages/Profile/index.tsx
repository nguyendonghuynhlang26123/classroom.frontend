//Profile
import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Box, Button, CircularProgress, Container, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import { NAME_REGEX, STUDENT_ID_REGEX } from 'common/constants/regex';
import { IChangePassBody, IUserBody } from 'common/interfaces';
import Utils from 'common/utils';
import { Navbar, useAuth, useLoading } from 'components';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { useUpdateProfileMutation, useUploadImageMutation, useGetAllClassesQuery, useChangePassMutation } from 'services/api';
import * as yup from 'yup';
import { profileSx } from './style';
import { ChangePassBtn } from './subcomponents';

const validationSchema = yup.object({
  student_id: yup.string().matches(STUDENT_ID_REGEX, 'Invalid studentID'),
  first_name: yup.string().required('Firstname is required'),
  last_name: yup.string().required('Lastname is required'),
});

const UserProfile = () => {
  const { userData, reload } = useAuth();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadImageMutation();
  const [changePass, { isLoading: isChangingPass }] = useChangePassMutation();
  const { data: classrooms, isLoading: isFetchingClassrooms } = useGetAllClassesQuery();
  const [avatar, setAvatar] = React.useState<string | undefined>(userData?.avatar);
  const [uploadFile, setUploadFile] = React.useState<any>(null);
  const [loading, setLoading] = useLoading();

  const formik = useFormik({
    initialValues: {
      first_name: userData?.first_name || '',
      last_name: userData?.last_name || '',
      student_id: userData?.student_id || '',
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (userData) {
        handleUpdateData(userData._id as string, values, uploadFile)
          .then(() => {
            reload();
            toast.success('Update succeed');
          })
          .catch((err) => {
            toast.error('Update failed! ' + err.data);
          });
      }
    },
  });

  React.useEffect(() => {
    setLoading(Utils.isLoading(isLoading, isUploading, isFetchingClassrooms, isChangingPass));
  }, [isLoading, isUploading, isFetchingClassrooms, isChangingPass]);

  const handleUpdateData = async (id: string, values: IUserBody, file: any) => {
    let form_data = new FormData();

    if (file) {
      form_data.append('image', file);
      const uploaded = await uploadAvatar(form_data).unwrap();
      return await updateProfile({ id: id, body: { ...values, avatar: uploaded.url } });
    }
    return await updateProfile({ id: id, body: { ...values, avatar: undefined } });
  };

  const handleSelectFile = (ev: any) => {
    const file = ev?.target?.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.warning('Image size is too large! Please try another one');
      return;
    }
    if (file.type.split('/')[0] !== 'image') {
      toast.warning('Please upload image only!');
      return;
    }
    setUploadFile(file);
    setAvatar(URL.createObjectURL(file));
  };

  const handleChangePass = (body: IChangePassBody): Promise<any> => {
    return new Promise((resolve, reject) =>
      changePass({ id: userData?._id as string, body: body })
        .unwrap()
        .then((response: any) => {
          toast.success('Change pass succeed');
          return resolve(response);
        })
        .catch((err) => {
          console.log('log ~ file: index.tsx ~ line 93 ~ returnnewPromise ~ err', err);
          return reject(err.data);
        }),
    );
  };

  return (
    <Box sx={profileSx.root}>
      <Navbar classrooms={classrooms || []} toolbarComponents={<>{loading && <LinearProgress />}</>}>
        <>
          <Typography variant="body1">Classroom setting</Typography>
          <Button
            variant="contained"
            onClick={() => {
              formik.submitForm();
            }}
            disabled={loading}
            startIcon={loading && <CircularProgress size={16} />}
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
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={4} sx={{ px: 2, py: 1 }}>
              <Box sx={profileSx.avatarContainer}>
                {avatar ? (
                  <Avatar variant="rounded" sx={{ width: '100%', height: 'auto' }} src={avatar} />
                ) : (
                  <Avatar variant="rounded" sx={{ width: '100%', height: 'auto' }}></Avatar>
                )}

                {userData?.google_id === null && (
                  <label htmlFor="icon-button-file" className="overlay">
                    <input accept="image/*" id="icon-button-file" type="file" onChange={handleSelectFile} />
                    <PhotoCamera />
                  </label>
                )}
              </Box>
            </Grid>
            <Grid item xs={8}>
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
                label="Student Id"
                fullWidth
                value={formik.values.student_id}
                onChange={formik.handleChange}
                error={formik.touched.student_id && Boolean(formik.errors.student_id)}
                helperText={formik.touched.student_id && formik.errors.student_id}
              />
              <TextField id="email" name="email" label="Email" fullWidth disabled value={userData?.email} />
              <Stack justifyContent="space-between">
                <Typography sx={profileSx.form_note} variant="body2">
                  {userData?.google_id != null ? `*You are linking your account with google` : ''}
                </Typography>
                <ChangePassBtn loading={loading} handleSubmit={handleChangePass} />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
