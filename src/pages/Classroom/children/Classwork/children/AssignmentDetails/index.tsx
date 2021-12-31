import { Add, AssignmentOutlined, MoreVert } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { IGradingAssignment, UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { useClassroomCtx, useCopyToClipboard } from 'components';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetAssignmentByIdQuery, useFetchFinalGradesMutation } from 'services';
import { assignmentDetailsSx } from './style';

const AssignmentDetails = () => {
  const { role, studentId } = useClassroomCtx();
  const navigate = useNavigate();
  const { id, assignmentId } = useParams();
  const [, copyFn] = useCopyToClipboard();
  const { data } = useGetAssignmentByIdQuery({
    classId: id as string,
    assignmentId: assignmentId as string,
  });
  const [fetchMyGrading, { data: gradings }] = useFetchFinalGradesMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [assignmentGrade, setGrade] = React.useState<IGradingAssignment | undefined>();
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    if (studentId)
      fetchMyGrading({ classId: id as string, studentId: studentId })
        .unwrap()
        .then((response) => {});
  }, [studentId]);

  React.useEffect(() => {
    if (gradings && gradings.length > 0 && data) {
      const grade = gradings.find((g: IGradingAssignment) => g.assignment_id === data._id);
      if (grade !== null) setGrade(grade);
    }
  }, [gradings, data]);

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
      <Container>
        {data && (
          <Grid container spacing={2} sx={assignmentDetailsSx.root}>
            <Grid item xs={role === UserRole.STUDENT ? 9 : 12}>
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
                    <Typography className="total_point">{data.total_points ? `${data.total_points} point` : 'No grading'}</Typography>
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
                <Divider className="divider" />
              </Box>
            </Grid>
            {role === UserRole.STUDENT && (
              <Grid item xs={3}>
                <Paper sx={assignmentDetailsSx.submitZone}>
                  <Typography className="title">Your grading</Typography>
                  {data && assignmentGrade ? (
                    <>
                      <Typography color="primary" className="grade">
                        <b>{assignmentGrade.mark}</b>/{data.total_points}
                      </Typography>
                      <Typography className="no-grade">
                        Not what your expectation? <Link href="#">Request a grade review</Link>{' '}
                      </Typography>
                    </>
                  ) : (
                    <Typography className="no-grade">Your assignment has not been graded yet</Typography>
                  )}
                </Paper>
              </Grid>
            )}
          </Grid>
        )}
        <Menu id="details-menu" anchorEl={anchorEl} open={open} onClose={handleCloseModal}>
          {role !== UserRole.STUDENT && <MenuItem onClick={navigateToEditPage}>Go to edit page</MenuItem>}
          <MenuItem onClick={handleCopyLink}>Copy link</MenuItem>
        </Menu>
      </Container>
    </Collapse>
  );
};

export default AssignmentDetails;
