import { Close } from '@mui/icons-material';
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
} from '@mui/material';
import { RichEditor, MyTimePicker } from 'components';
import React from 'react';

import { useNavigate } from 'react-router';
import { formSx } from './style';
import { GradeStructure } from './GradeStructure';

export const AssignmentForm = ({}) => {
  const navigate = useNavigate();
  const [description, setDescription] = React.useState<string>();
  const [isCreatingTopic, setIsCreatingTopic] = React.useState<boolean>(false);
  const [disableGrading, setDisableGrading] = React.useState<boolean>(false);
  const [disableDueDate, setDisableDueDate] = React.useState<boolean>(false);

  const handleSelectTopic = (ev: any) => {
    const value = ev?.target?.value;
    if (value === -2) {
      setIsCreatingTopic(true);
    }
  };

  return (
    <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Grow in={true} appear={true} timeout={300}>
        <Box sx={formSx.root}>
          <Toolbar sx={formSx.toolbar}>
            <IconButton size="large" edge="start" color="inherit" aria-label="close modal" onClick={() => navigate(-1)}>
              <Close sx={{ fontSize: 20 }} />
            </IconButton>
            <Typography variant="body1">Create an assignment</Typography>

            <Stack direction="row" sx={{ ml: 'auto' }} gap={1}>
              <Button color="secondary">Reset</Button>
              <Button variant="outlined">Save</Button>
            </Stack>
          </Toolbar>

          <Grid container spacing={2} sx={formSx.grid} minHeight="calc(100vh - 64px)">
            <Grid item xs={8}>
              <Box sx={formSx.form}>
                <Typography sx={formSx.formHeader}>Display info</Typography>
                <TextField fullWidth id="title" label="Title" variant="outlined" />
                <RichEditor
                  data={description}
                  handleChange={(value) => setDescription(value)}
                  hintText={'Assignment instruction'}
                />
              </Box>

              <GradeStructure />
            </Grid>
            <Grid item xs={4}>
              <Box sx={formSx.form}>
                <Typography sx={formSx.formHeader}>Configuration</Typography>

                <Stack direction="row">
                  <Typography sx={formSx.formTitle}>Total point</Typography>
                  <Checkbox
                    size="small"
                    checked={!disableGrading}
                    onChange={(ev) => setDisableGrading((prv) => !prv)}
                  />
                </Stack>
                <TextField
                  id="total_points"
                  type="number"
                  defaultValue={100}
                  name="total_points"
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
                  <Checkbox
                    size="small"
                    checked={!disableDueDate}
                    onChange={(ev) => setDisableDueDate((prv) => !prv)}
                  />
                </Stack>
                <MyTimePicker
                  label="Due time"
                  value={0}
                  fullWidth
                  disabled={disableDueDate}
                  handleChange={(value) => {
                    console.log('log ~ file: index.tsx ~ line 81 ~ AssignmentForm ~ value', value);
                  }}
                />
              </Box>

              <Box sx={formSx.form}>
                <Typography sx={formSx.formHeader}>Topic</Typography>
                {isCreatingTopic ? (
                  <TextField
                    fullWidth
                    autoFocus
                    variant="filled"
                    label="Enter topic title"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle topic creation"
                            onClick={() => setIsCreatingTopic(false)}
                            onMouseDown={() => setIsCreatingTopic(false)}
                            edge="end"
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
