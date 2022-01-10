import { Check, Close, GraphicEq } from '@mui/icons-material';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import { IGradeReview, IUser, RequestReviewStatus } from 'common/interfaces';
import Utils from 'common/utils';
import { GradeReviewComments, useAuth } from 'components';
import React from 'react';
import { gradeReviewSx } from './style';
import { StudentGradeReviewType } from './type';

export const GradeReviewPanel = ({ data, handleSubmitComment }: StudentGradeReviewType) => {
  const { userData } = useAuth();

  const handleSendBtn = (requestId: string, comment: string) => {
    if (requestId && comment) handleSubmitComment(requestId, comment);
  };

  const getColor = (status: RequestReviewStatus) => {
    if (status === RequestReviewStatus.APPROVED) return 'success';
    else if (status === RequestReviewStatus.REJECTED) return 'error';
    else return 'primary';
  };
  const getIcon = (status: RequestReviewStatus) => {
    if (status === RequestReviewStatus.OPEN) return <GraphicEq className="icon" />;
    else if (status === RequestReviewStatus.REJECTED) return <Close className="icon" />;
    else if (status === RequestReviewStatus.APPROVED) return <Check className="icon" />;
  };

  return (
    <Box sx={gradeReviewSx.root}>
      {data && data.length > 0 && (
        <>
          <Typography variant="h5">Grade reviews</Typography>
          <Timeline sx={gradeReviewSx.container} position="right">
            {data.map((gr: IGradeReview, i: number) => (
              <TimelineItem key={i} sx={gradeReviewSx.item}>
                <TimelineSeparator>
                  <TimelineDot color={getColor(gr.status)}>{getIcon(gr.status)}</TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="content">
                  <Box>
                    <Typography className="time">{Utils.displayDate(gr.created_at as number)}</Typography>
                    <Typography className="title" component="span">
                      You request a grade review with a expeted grade of {gr.expect_mark}
                    </Typography>

                    <GradeReviewComments gr={gr} userData={userData as IUser} handleSendBtn={handleSendBtn} />
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </>
      )}
    </Box>
  );
};
