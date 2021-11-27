import { Add, AssignmentOutlined, MoreVert } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { useClassroomCtx, useCopyToClipboard } from 'components';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetAssignmentByIdQuery } from 'services';
import { assignmentDetailsSx } from './style';

const AssignmentDetails = () => {
  const { role } = useClassroomCtx();
  const navigate = useNavigate();
  const { id, assignmentId } = useParams();
  const [, copyFn] = useCopyToClipboard();
  const { data } = useGetAssignmentByIdQuery({
    classId: id as string,
    assignmentId: assignmentId as string,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleCloseModal = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = () => {
    copyFn(window.location.href);
    handleCloseModal();
  };

  const navigateToEditPage = () => {
    handleCloseModal();
    navigate(`/classroom/${id}/work/edit/${assignmentId}`);
  };

  const isExpired = () => {
    if (!data) return false;
    if (data.due_date === null || Date.now() <= data.due_date) return false;
    return true;
  };
  return (
    <Collapse timeout={500} appear={true} in={true}>
      {data && (
        <Grid container spacing={2} sx={assignmentDetailsSx.root}>
          <Grid item xs={9}>
            <Box>
              <Stack direction="row" alignItems="center" sx={assignmentDetailsSx.header}>
                <Avatar sizes="small" sx={{ bgcolor: isExpired() ? 'grey.500' : 'primary.main' }}>
                  <AssignmentOutlined />
                </Avatar>
                <Typography>{data?.title}</Typography>
                <IconButton onClick={(ev) => setAnchorEl(ev.currentTarget)}>
                  <MoreVert />
                </IconButton>
              </Stack>

              <Box sx={assignmentDetailsSx.subheader}>
                <Typography sx={assignmentDetailsSx.time}>{Utils.displayDate(data.created_at as number)}</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography className="total_point">
                    {data.total_points ? `${data.total_points} point` : 'No grading'}
                  </Typography>
                  <Typography className="total_point">
                    {data.due_date ? 'Due at ' + Utils.displayDate(data.due_date) : 'No due date'}
                  </Typography>
                </Stack>
                <Divider className="divider" />
              </Box>
            </Box>
            <Box sx={assignmentDetailsSx.container}>
              <Box className="htmlContainer">
                <div dangerouslySetInnerHTML={{ __html: data.instructions }} />
              </Box>
              {/* <CriteriaDetails criterias={data.grade_criterias} /> */}
              <Divider className="divider" />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Paper sx={assignmentDetailsSx.submitZone}>
              <Typography>Your work</Typography>
              <Button size="small" variant="outlined" fullWidth startIcon={<Add />}>
                Add or Create
              </Button>
              <Button size="small" variant="contained" fullWidth>
                Submit
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
      <Menu id="details-menu" anchorEl={anchorEl} open={open} onClose={handleCloseModal}>
        {role !== UserRole.STUDENT && <MenuItem onClick={navigateToEditPage}>Go to edit page</MenuItem>}
        <MenuItem onClick={handleCopyLink}>Copy link</MenuItem>
      </Menu>
    </Collapse>
  );
};

export default AssignmentDetails;
