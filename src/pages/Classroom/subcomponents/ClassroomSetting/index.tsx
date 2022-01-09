import React from 'react';
import { settingModalSx } from './style';
import {
  Box,
  Grow,
  IconButton,
  Modal,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  LinearProgress,
  Alert,
  Stack,
  Table,
  TableContainer,
  Link,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Avatar,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLoading, ConfirmDialog } from 'components';
import { useParams } from 'react-router-dom';
import { ClassroomSettingProps, UploadConfirmProps } from './type';
import { IClassroomBody } from 'common/interfaces';
import { toast } from 'react-toastify';
import { Close, Download, PhotoCamera, Settings, Upload } from '@mui/icons-material';
import {
  useDownloadStudentListMutation,
  useGetAllStudentsQuery,
  useUpdateClassMutation,
  useUploadAndUpdateStudentListMutation,
  useUploadImageMutation,
  useUploadStudentListMutation,
} from 'services';
import Utils from 'common/utils';

type FormType = {
  title: string;
  section: string;
  room?: string;
  subject?: string;
};

const validationSchema = yup.object({
  title: yup
    .string()
    .min(1, 'Classroom Title should be of 1-100 characters length')
    .max(100, 'Classroom Title should be of 1-100 characters length')
    .required('Classroom Title is required'),
  section: yup.string().min(1, 'Section should be of 1-50 characters length').max(50, 'Section should be of 1-50 characters length'),
  subject: yup.string().min(1, 'Subject should be of 1-50 characters length').max(50, 'Subject should be of 1-50 characters length'),
  room: yup.string().min(1, 'Room should be of 1-50 characters length').max(50, 'Room should be of 1-50 characters length'),
});
const defaultProps: FormType = {
  title: '',
  room: '',
  section: '',
  subject: '',
};

const UploadConfirm = ({ csvFile, loading, onClick, onClose }: UploadConfirmProps) => (
  <Stack direction="row" sx={settingModalSx.alertContainer} spacing={1}>
    <p>
      📁 <em> {csvFile.name} </em>
    </p>
    <IconButton size="small" color="warning" onClick={onClose}>
      <Close />
    </IconButton>
    <Button variant="contained" color="warning" component="span" size="small" disabled={loading} onClick={onClick}>
      Upload
    </Button>
  </Stack>
);

export const ClassroomSetting = ({ classData }: ClassroomSettingProps) => {
  const { id } = useParams();
  const uploadRef = React.createRef<HTMLInputElement>();
  const { data: studentData, error: studentsErr, isLoading: isFetchingStudents } = useGetAllStudentsQuery(id as string);
  const [updateClassData, { isLoading: isUpdatingData }] = useUpdateClassMutation();

  const [uploadCSVList, { isLoading: isUploading }] = useUploadStudentListMutation();
  const [updateStuList, { isLoading: isUpdateStudents }] = useUploadAndUpdateStudentListMutation();
  const [downloadCsvFile, { isLoading: isDownloadComplete }] = useDownloadStudentListMutation();

  const [uploadAvatar, { isLoading: isUploadingImg }] = useUploadImageMutation();
  const [avatar, setAvatar] = React.useState<string | undefined>(classData?.image);
  const [uploadingImgFile, setUploadImgFile] = React.useState<any>(null);

  const [modal, showModal] = React.useState<boolean>(false);
  const [alert, showAlert] = React.useState<boolean>(false);
  const [alertReUpload, showAlertReUpload] = React.useState<boolean>(false);
  const [csvFile, setCSVFile] = React.useState<any>(null);

  const [loading, setLoading] = useLoading();

  const formik = useFormik<FormType>({
    initialValues: defaultProps,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUpdateData(id as string, values, uploadingImgFile)
        .then(() => {
          toast.success('Update class data completed');
        })
        .catch((err) => {
          toast.error('Update class data failed! ' + err.data);
        });
    },
  });

  React.useEffect(() => {
    if (classData) {
      formik.setValues({
        title: classData.title,
        section: classData.section,
        room: classData.room || '',
        subject: classData.subject || '',
      });
      setAvatar(classData?.image);
    }
  }, [classData]);

  React.useEffect(() => {
    setLoading(Utils.isLoading(isFetchingStudents, isUpdatingData, isUploading, isUpdateStudents, isDownloadComplete, isUploadingImg));
  }, [isFetchingStudents, isUpdatingData, isUploading, isUpdateStudents, isDownloadComplete, isUploadingImg]);

  React.useEffect(() => {
    const err = studentsErr as any;
    if (err && err.status === 404) {
      if (!modal) showAlert(true);
    }
  }, [studentsErr]);

  const handleUploadBtn = (ev: any) => {
    const file = ev?.target?.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.warning('File size is too large! Please try another one');
      return;
    }
    setCSVFile(file);
  };

  const handleUploadClassStudent = (mode: 'UPDATE' | 'CREATE', file: any) => {
    const form = new FormData();
    if (file) form.append('csv', file);
    if (mode === 'CREATE') {
      uploadCSVList({ class_id: id as string, body: form })
        .unwrap()
        .then(() => {
          toast.success('Upload student list completed! New students are registered');
        })
        .catch((err) => {
          toast.error('Upload new student list failed! ' + err.data);
        });
    } else {
      updateStuList({ class_id: id as string, body: form })
        .unwrap()
        .then(() => {
          toast.success('Upload student list completed! New students are registered');
        })
        .catch((err) => {
          toast.error('Update existing student list failed! ' + err.data);
        });
    }
    setCSVFile(null);
  };

  const showUploadPicker = () => {
    if (uploadRef?.current) uploadRef.current.click();
  };

  const downloadStudentList = () => {
    downloadCsvFile(id as string)
      .unwrap()
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'student_list.csv'); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        toast.error('Cannot download the file! ' + err.data);
      });
  };

  const triggerDownloadTemplate = (ev: any) => {
    ev.preventDefault();
    const url = window.URL.createObjectURL(new Blob(['student_id,name']));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template.csv'); //or any other extension
    document.body.appendChild(link);
    link.click();
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
    setUploadImgFile(file);
    setAvatar(URL.createObjectURL(file));
  };

  const handleUpdateData = async (id: string, values: FormType, file: any) => {
    let form_data = new FormData();

    if (file) {
      form_data.append('image', file);
      const uploaded = await uploadAvatar(form_data).unwrap();
      return await updateClassData({ id: id, body: { ...values, image: uploaded.url } });
    }
    return await updateClassData({ id: id, body: { ...values, image: undefined } });
  };

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
        <Settings sx={{ fontSize: 24 }} />
      </IconButton>

      <input type="file" accept=".csv" style={{ display: 'none' }} id="button-file" onChange={handleUploadBtn} ref={uploadRef} />

      <Modal
        sx={{ overflow: 'auto' }}
        open={modal}
        onClose={() => showModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grow in={modal} timeout={300}>
          <Box sx={settingModalSx.root}>
            <Toolbar sx={settingModalSx.toolbar}>
              <IconButton size="large" edge="start" color="inherit" aria-label="close modal" onClick={() => showModal(false)}>
                <Close sx={{ fontSize: 20 }} />
              </IconButton>
              <Typography variant="body1">Classroom setting</Typography>

              <Button variant="contained" onClick={() => formik.submitForm()}>
                Save
              </Button>
            </Toolbar>
            {loading && <LinearProgress sx={{ width: '100%' }} />}

            <Container maxWidth={false} sx={settingModalSx.container}>
              <Box sx={settingModalSx.form} component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                <Typography color="primary" className="header">
                  Class Details
                </Typography>

                <Box sx={settingModalSx.imageContainer}>
                  <Avatar variant="rounded" sx={{ height: '100%', width: '100%' }} src={avatar} />

                  <label htmlFor="icon-button-file" className="overlay">
                    <input accept="image/*" id="icon-button-file" type="file" onChange={handleSelectFile} />
                    <PhotoCamera />
                  </label>
                </Box>
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

              <Box sx={settingModalSx.form}>
                <Typography className="header" color="primary">
                  Students Details
                </Typography>
                {!studentData ? (
                  <Alert severity="warning">
                    Warning! You need to import a list of students to the system to keep track of your classworks{' '}
                    <Link href="#" sx={{ color: 'warning.main' }} underline="none" onClick={triggerDownloadTemplate}>
                      Here is the upload template.
                    </Link>
                    {csvFile ? (
                      <UploadConfirm
                        csvFile={csvFile}
                        loading={loading}
                        onClose={() => setCSVFile(null)}
                        onClick={() => handleUploadClassStudent('CREATE', csvFile)}
                      />
                    ) : (
                      <Box sx={settingModalSx.alertContainer}>
                        <Button
                          variant="outlined"
                          color="warning"
                          component="span"
                          size="small"
                          disabled={loading}
                          onClick={showUploadPicker}
                        >
                          Import student list
                        </Button>
                      </Box>
                    )}
                  </Alert>
                ) : (
                  <Box>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableBody>
                          <TableRow>
                            <TableCell>Latest update</TableCell>
                            <TableCell align="center">{Utils.displayDate(studentData.updated_at as number)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Number of students</TableCell>
                            <TableCell align="center">{studentData.students.length}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Number of account synced</TableCell>
                            <TableCell align="center">{studentData.students.filter((s) => s.status === 'SYNCED').length}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Update this list by importing new one</TableCell>
                            <TableCell align="center">
                              <Tooltip title="Import student list from csv">
                                {csvFile ? (
                                  <UploadConfirm
                                    csvFile={csvFile}
                                    loading={loading}
                                    onClose={() => setCSVFile(null)}
                                    onClick={() => showAlertReUpload(true)}
                                  />
                                ) : (
                                  <Tooltip
                                    arrow
                                    title={
                                      <Typography id="tooltip-text" sx={{ fontSize: 12 }}>
                                        Upload student list sheet{' '}
                                        <Link href="#" sx={{ fontSize: 12, color: 'yellow' }} onClick={triggerDownloadTemplate}>
                                          Download template here
                                        </Link>
                                      </Typography>
                                    }
                                  >
                                    <IconButton color="primary" size="small" onClick={showUploadPicker}>
                                      <Upload className="icon" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Export the current list</TableCell>
                            <TableCell align="center">
                              <Tooltip title="Export as csv">
                                <IconButton color="primary" size="small" onClick={downloadStudentList}>
                                  <Download />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </Box>
            </Container>
          </Box>
        </Grow>
      </Modal>

      <ConfirmDialog
        open={alert}
        alwayShow={true}
        handleClose={() => {}}
        title="⚠Alert"
        description="You need to add student list to your class"
        onConfirm={() => {
          showModal(true);
          showAlert(false);
        }}
      />
      <ConfirmDialog
        open={alertReUpload}
        handleClose={() => {
          showAlertReUpload(false);
        }}
        title="⚠Alert"
        description="Do you want to re-upload the student list? All synchronizing account may be reseted"
        onConfirm={() => {
          showAlertReUpload(false);
          if (csvFile) handleUploadClassStudent('UPDATE', csvFile);
        }}
      />
    </>
  );
};
