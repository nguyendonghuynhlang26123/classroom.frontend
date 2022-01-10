import { Check, Close, GraphicEq } from '@mui/icons-material';
import { Box, Button, Chip, Collapse, Divider, Stack, Typography } from '@mui/material';
import { IAssignment, IGradingAssignment, IUser, RequestReviewStatus } from 'common/interfaces';
import Utils from 'common/utils';
import { GradeReviewComments, StudentCard, useAuth, useDialog, useLoading, useNotification } from 'components';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useAcceptReviewRequestMutation,
  useCreateCommentRequestMutation,
  useGetOneGradeReviewQuery,
  useRejectReviewRequestMutation,
} from 'services';
import { reviewPanelSx } from './style';
import { AcceptReviewForm } from './subcomponents';

const ReviewPanel = () => {
  const { id, reviewId } = useParams();
  const { userData } = useAuth();
  const { socketTrigger } = useNotification();
  const {
    data: review,
    refetch,
    isLoading: isFetchingData,
  } = useGetOneGradeReviewQuery({ id: id as string, gradeReviewId: reviewId as string });
  const [submitComment, { isLoading: isSubmitComment }] = useCreateCommentRequestMutation();
  const [rejectReview, { isLoading: isRejecting }] = useRejectReviewRequestMutation();
  const [acceptReview, { isLoading: isAccepting }] = useAcceptReviewRequestMutation();

  const [showDialog, RejectDialog] = useDialog();
  const [, showLoading] = useLoading();

  const [acceptForm, showAcceptForm] = React.useState<boolean>(false);
  const [requester, setRequester] = React.useState<IUser>();
  const [assignment, setAssignment] = React.useState<IAssignment>();
  const [grading, setGrading] = React.useState<IGradingAssignment>();

  React.useEffect(() => {
    if (review) {
      setAssignment(review.assignment_id as IAssignment);
      setGrading(review.grading_id as IGradingAssignment);
      setRequester(review.comments[0].author as IUser);
    }
  }, [review]);

  React.useEffect(() => {
    refetch();
  }, [socketTrigger]);

  React.useEffect(() => {
    showLoading(Utils.isLoading(isFetchingData, isSubmitComment, isRejecting, isAccepting));
  }, [isFetchingData, isSubmitComment, isRejecting, isAccepting]);

  const handleSendBtn = (requestId: string, message: string) => {
    submitComment({
      id: id as string,
      reviewId: requestId,
      message: message,
    })
      .unwrap()
      .then(() => {
        toast.success('Submiting request successfully');
      })
      .catch(() => {
        toast.error('Failed to submit this review request! Please try again later');
      });
  };

  const handleRejectGradeReview = () => {
    console.log('REJECT');
    rejectReview({ id: id as string, reviewId: reviewId as string })
      .unwrap()
      .then(() => {
        toast.success('Submiting response successfully');
      })
      .catch(() => {
        toast.error('Failed to submit response for this review request! Please try again later');
      });
  };

  const handleAcceptGradeReview = (mark: number) => {
    acceptReview({ id: id as string, reviewId: reviewId as string, mark: mark })
      .unwrap()
      .then(() => {
        toast.success('Submiting response successfully');
      })
      .catch(() => {
        toast.error('Failed to submit response for this review request! Please try again later');
      });
  };

  const getIconByStatus = (status: RequestReviewStatus) => {
    if (status === RequestReviewStatus.APPROVED) return <Chip icon={<Check />} label="Approved" color="success" />;
    else if (status === RequestReviewStatus.REJECTED) return <Chip icon={<Close />} label="Rejected" color="error" />;
    else return <Chip icon={<GraphicEq />} label="Open" color="primary" />;
  };

  return (
    <Collapse timeout={500} appear={true} in={true}>
      <Box sx={reviewPanelSx.header}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {review?.status && getIconByStatus(review.status)}
          <Typography>{assignment?.title}</Typography>
        </Stack>
        {review?.status === RequestReviewStatus.OPEN && (
          <Stack direction="row" spacing={1}>
            <Button color="error" onClick={() => showDialog('Do you really want to reject this grade review?', handleRejectGradeReview)}>
              ❌ Reject
            </Button>
            <Button color="success" onClick={() => showAcceptForm(true)}>
              ✔ Approve
            </Button>
          </Stack>
        )}
      </Box>
      <Divider />
      <Box sx={reviewPanelSx.main}>
        <Stack sx={reviewPanelSx.info} direction="row" divider={<Divider orientation="vertical" variant="middle" flexItem />} spacing={3}>
          <Box className="student-container" sx={{ flex: 1 }}>
            <Typography className="title">Requester</Typography>
            {requester && <StudentCard data={requester} />}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography className="title">Request Details</Typography>
            <Box>
              <Stack direction="row" className="assignment-record">
                <Typography>Assignment name: </Typography>
                <Typography noWrap>{assignment?.title}</Typography>
              </Stack>
              <Stack direction="row" className="assignment-record">
                <Typography>Request date: </Typography>
                <Typography noWrap>{Utils.displayDate(review?.created_at as number)}</Typography>
              </Stack>
              <Stack direction="row" className="assignment-record">
                <Typography>Current grade: </Typography>
                <Typography>
                  <em> (last updated at: {Utils.displayDate(grading?.updated_at as number)}) </em>
                  {grading?.mark} / {assignment?.total_points}
                </Typography>
              </Stack>
              <Stack direction="row" className="assignment-record">
                <Typography>Request grade: </Typography>
                <Typography>{review?.expect_mark}</Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>

        <Box sx={reviewPanelSx.commentSection}>
          <Typography className="title">Comments</Typography>
          {review && <GradeReviewComments gr={review} userData={userData as IUser} handleSendBtn={handleSendBtn} />}
        </Box>
      </Box>

      <RejectDialog />
      {assignment && review && (
        <AcceptReviewForm
          handleClose={() => showAcceptForm(false)}
          open={acceptForm}
          totalPoint={assignment?.total_points}
          expectPoint={review?.expect_mark}
          handleProceed={handleAcceptGradeReview}
        />
      )}
    </Collapse>
  );
};

export default ReviewPanel;
