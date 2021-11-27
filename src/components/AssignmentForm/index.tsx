import { Close, Check } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Modal,
  Grow,
  Stack,
  Grid,
  TextField,
  InputAdornment,
  Checkbox,
  Select,
  MenuItem,
  useScrollTrigger,
  AppBar,
  LinearProgress,
} from '@mui/material';
import { RichEditor, MyTimePicker } from 'components';
import React from 'react';

import { useNavigate, useParams } from 'react-router';
import { formSx } from './style';
import { AssignmentFormProps } from './type';
import { IAssignmentBody } from 'common/interfaces';
import { toast } from 'react-toastify';

const getTommorrowDate = (): number => {
  var day = new Date();
  day.setDate(day.getDate() + 1);
  return day.getTime();
};

const validateForm = (form: IAssignmentBody) => {
  if (form.title === '') return [false, 'Title cannot be empty'];

  return [true, null];
};

export const AssignmentForm = ({ formData, isLoading, handleChange, onSubmit, onReset }: AssignmentFormProps) => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const [disableDueDate, setDisableDueDate] = React.useState<boolean>(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  React.useEffect(() => {
    setDisableDueDate(!Boolean(formData?.due_date));
  }, [formData]);

  const submitData = () => {
    const submission: IAssignmentBody = {
      ...formData,
      due_date: disableDueDate ? undefined : formData.due_date,
    };
    const [success, msg] = validateForm(submission);
    if (success) onSubmit(submission);
    else {
      toast.warning(msg);
    }
  };

  const handleChangeEvent = (ev: any) => {
    const property = ev.currentTarget.name;
    const value = ev.currentTarget.value;
    handleChange(property, value);
  };

  const toggleDueDate = (ev: any) => {
    setDisableDueDate((prv) => !prv);
  };

  return (
    <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Grow in={true} appear={true} timeout={300}>
        <Box sx={formSx.root}>
          <AppBar elevation={trigger ? 4 : 0}>
            <Toolbar sx={formSx.toolbar}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="close modal"
                onClick={() => navigate(`/classroom/${id}/work`)}
              >
                <Close sx={{ fontSize: 20 }} />
              </IconButton>
              <Typography variant="body1">Create an assignment</Typography>

              <Stack direction="row" sx={{ ml: 'auto' }} gap={1}>
                <Button color="secondary" onClick={onReset} disabled={isLoading}>
                  Reset
                </Button>
                <Button variant="outlined" onClick={submitData} disabled={isLoading}>
                  Save
                </Button>
              </Stack>
            </Toolbar>
            {isLoading && <LinearProgress />}
          </AppBar>

          <Grid container spacing={2} sx={formSx.grid} minHeight="calc(100vh - 64px)">
            <Grid item xs={8}>
              <Box sx={formSx.form}>
                <Typography sx={formSx.formHeader}>Display info</Typography>
                <TextField
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  variant="outlined"
                  value={formData?.title || ''}
                  onChange={handleChangeEvent}
                />
                <RichEditor
                  data={formData?.instructions || ''}
                  handleChange={(value) => handleChange('instructions', value)}
                  hintText={'Assignment instruction'}
                />
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box sx={formSx.form}>
                <Typography sx={formSx.formHeader}>Configuration</Typography>

                <TextField
                  id="total_points"
                  type="number"
                  name="total_points"
                  value={formData?.total_points || 0}
                  onChange={handleChangeEvent}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ fontSize: 12 }}>
                        pts
                      </InputAdornment>
                    ),
                  }}
                />
                <Stack direction="row">
                  <Typography sx={formSx.formTitle}>Due time</Typography>
                  <Checkbox size="small" checked={!disableDueDate} onChange={toggleDueDate} />
                </Stack>
                <MyTimePicker
                  label="Due time"
                  value={formData?.due_date || getTommorrowDate()}
                  fullWidth
                  disabled={disableDueDate}
                  handleChange={(time: any) => {
                    handleChange('due_date', time.getTime());
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grow>
    </Modal>
  );
};
