import { AssignmentOutlined, MoreVert } from '@mui/icons-material';
import { Avatar, Box, Collapse, Container, Divider, Grid, IconButton, Link, Menu, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { IGradeReview, IGradingAssignment, UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { useClassroomCtx, useCopyToClipboard, useLoading } from 'components';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  useCreateReviewRequestMutation,
  useFetchFinalGradesMutation,
  useGetAssignmentByIdQuery,
  useGetOneGradeReviewMutation,
  useCreateCommentRequestMutation,
} from 'services';
import { assignmentDetailsSx } from './style';
import { GradeReviewPanel, RequestForm } from './subcomponents';

const AssignmentDetails = () => {
  const { role, studentId } = useClassroomCtx();
  const navigate = useNavigate();
  const { id, assignmentId } = useParams();
  const [, copyFn] = useCopyToClipboard();
  const { data, isLoading: isFetchingAssignment } = useGetAssignmentByIdQuery({
    classId: id as string,
    assignmentId: assignmentId as string,
  });
  const [submitReviewRequest, { isLoading: isSubmitingRequest }] = useCreateReviewRequestMutation();
  const [fetchMyGrading, { data: gradings, isLoading: isFetchingMark }] = useFetchFinalGradesMutation();
  const [fetchAGradeReview, { isLoading: isFetchingReviews }] = useGetOneGradeReviewMutation();
  const [submitComment, { isLoading: isSubmitComment }] = useCreateCommentRequestMutation();

  const [, setLoading] = useLoading();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [assignmentGrade, setGrade] = React.useState<IGradingAssignment | undefined>();
  const [reviewRequestForm, showReviewRequestForm] = React.useState<boolean>(false);
  const [reviewList, setReviewList] = React.useState<IGradeReview[]>([]);

  React.useEffect(() => {
    if (studentId) fetchMyGrading({ classId: id as string, studentId: studentId });
  }, [studentId]);

  React.useEffect(() => {
    if (gradings && gradings.length > 0 && data) {
      const grade = gradings.find((g: IGradingAssignment) => g.assignment_id === data._id);
      if (grade !== null) {
        setGrade(grade);
        fetchAllGradingReviews(grade.reviews);
      }
    }
  }, [gradings, data]);

  React.useEffect(() => {
    setLoading(Utils.isLoading(isFetchingAssignment, isSubmitingRequest, isFetchingMark, isFetchingReviews, isSubmitComment));
  }, [isFetchingAssignment, isSubmitingRequest, isFetchingMark, isFetchingReviews, isSubmitComment]);

  const handleCloseModal = () => {
    setAnchorEl(null);
  };

  const refetchGrading = () => {
    if (studentId && id) fetchMyGrading({ classId: id as string, studentId: studentId as string }); // Refetch data
  };

  const fetchAllGradingReviews = (reviews: string[]) => {
    const promises = reviews.map((r) => fetchAGradeReview({ id: id as string, gradeReviewId: r }));
    Promise.all(promises).then((responses: any[]) => {
      const reviewList: IGradeReview[] = [];
      responses.forEach((res) => {
        if (res.data) reviewList.push(res.data);
        else if (res.error) toast.warning('Fail to fetch a grade review request');
      });
      setReviewList(reviewList);
    });
  };

  const handleSubmitReviewRequest = (message: string, mark: number) => {
    submitReviewRequest({
      id: id as string,
      body: {
        message: message,
        expect_mark: mark,
        student_id: studentId as string,
        assignment_id: assignmentId as string,
      },
    })
      .unwrap()
      .then(() => {
        toast.success('Submiting request successfully');
        refetchGrading();
      })
      .catch(() => {
        toast.error('Failed to submit this review request! Please try again later');
      });
  };

  const handleCopyLink = () => {
    copyFn(window.location.href);
    handleCloseModal();
  };

  const navigateToEditPage = () => {
    handleCloseModal();
    navigate(`/classroom/${id}/work/edit/${assignmentId}`);
  };

  const handleSubmitComment = (requestId: string, message: string) => {
    submitComment({
      id: id as string,
      reviewId: requestId,
      message: message,
    })
      .unwrap()
      .then(() => {
        toast.success('Submiting request successfully');
        refetchGrading();
      })
      .catch(() => {
        toast.error('Failed to submit this review request! Please try again later');
      });
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
                        Not what you expected?{' '}
                        <Link
                          href="#"
                          onClick={(ev) => {
                            ev.preventDefault();
                            showReviewRequestForm(true);
                          }}
                        >
                          Request a grade review
                        </Link>
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
        <Menu id="details-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseModal}>
          {role !== UserRole.STUDENT && <MenuItem onClick={navigateToEditPage}>Go to edit page</MenuItem>}
          <MenuItem onClick={handleCopyLink}>Copy link</MenuItem>
        </Menu>

        {data && (
          <RequestForm
            open={reviewRequestForm}
            handleClose={() => showReviewRequestForm(false)}
            onSubmit={handleSubmitReviewRequest}
            assignment={data}
          />
        )}

        {role === UserRole.STUDENT && <GradeReviewPanel data={reviewList} handleSubmitComment={handleSubmitComment} />}
      </Container>
    </Collapse>
  );
};

export default AssignmentDetails;
