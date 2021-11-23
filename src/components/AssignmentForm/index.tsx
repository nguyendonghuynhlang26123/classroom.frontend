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

import { useNavigate } from 'react-router';
import { formSx } from './style';
import { GradeStructure } from './GradeStructure';
import { AssignmentFormProps } from './type';
import { IAssignmentBody } from 'common/interfaces';

export const AssignmentForm = ({ formData, isLoading, handleChange, onSubmit, onReset }: AssignmentFormProps) => {
  const navigate = useNavigate();
  const [inputTopic, setInputTopic] = React.useState<string>();
  const [isCreatingTopic, setIsCreatingTopic] = React.useState<boolean>(false);
  const [disableGrading, setDisableGrading] = React.useState<boolean>(false);
  const [disableDueDate, setDisableDueDate] = React.useState<boolean>(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleSelectTopic = (ev: any) => {
    const value = ev?.target?.value;
    if (value === -2) {
      setIsCreatingTopic(true);
    }
  };

  const submitData = () => {
    const submission: IAssignmentBody = {
      ...formData,
      total_points: disableGrading ? undefined : formData.total_points,
      due_date: disableDueDate ? undefined : formData.due_date,
    };
    onSubmit(submission);
  };

  const handleChangeEvent = (ev: any) => {
    const property = ev.currentTarget.name;
    const value = ev.currentTarget.value;
    handleChange(property, value);
  };

  const handleCreateTopic = () => {};

  const toggleGrading = (ev: any) => {
    setDisableGrading((prv) => !prv);
  };

  const toggleDueDate = (ev: any) => {
    setDisableDueDate((prv) => !prv);
  };

  const getTommorrowDate = (): number => {
    var day = new Date();
    day.setDate(day.getDate() + 1);
    return day.getTime();
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
                onClick={() => navigate(-1)}
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
                  value={formData.title}
                  onChange={handleChangeEvent}
                />
                <RichEditor
                  data={formData.instructions}
                  handleChange={(value) => handleChange('instructions', value)}
                  hintText={'Assignment instruction'}
                />
              </Box>

              <GradeStructure
                criterias={formData.grade_criterias}
                handleChange={(criterias) => handleChange('grade_criterias', criterias)}
              />
            </Grid>

            <Grid item xs={4}>
              <Box sx={formSx.form}>
                <Typography sx={formSx.formHeader}>Configuration</Typography>

                <Stack direction="row">
                  <Typography sx={formSx.formTitle}>Total point</Typography>
                  <Checkbox size="small" checked={!disableGrading} onChange={toggleGrading} />
                </Stack>
                <TextField
                  id="total_points"
                  type="number"
                  name="total_points"
                  value={formData.total_points || 0}
                  onChange={handleChangeEvent}
                  fullWidth
                  disabled={disableGrading}
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
                  value={formData.due_date || getTommorrowDate()}
                  fullWidth
                  disabled={disableDueDate}
                  handleChange={(time: any) => {
                    handleChange('due_date', time.getTime());
                  }}
                />
              </Box>

              <Box sx={formSx.form}>
                <Typography sx={formSx.formHeader}>Topic</Typography>
                {isCreatingTopic ? (
                  <TextField
                    fullWidth
                    autoFocus
                    variant="outlined"
                    label="Enter topic title"
                    value={inputTopic}
                    onChange={(ev) => setInputTopic(ev.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle topic creation"
                            onClick={() => setIsCreatingTopic(false)}
                            onMouseDown={() => setIsCreatingTopic(false)}
                            edge="end"
                            color="success"
                          >
                            <Check />
                          </IconButton>
                          <IconButton
                            aria-label="toggle topic creation"
                            onClick={() => setIsCreatingTopic(false)}
                            onMouseDown={() => setIsCreatingTopic(false)}
                            edge="end"
                            color="error"
                          >
                            <Close />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <Select id="topic" value={-1} onChange={handleSelectTopic} fullWidth>
                    <MenuItem value={-1}>No topic</MenuItem>
                    <MenuItem value={-2}>Create topic</MenuItem>
                  </Select>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grow>
    </Modal>
  );
};
