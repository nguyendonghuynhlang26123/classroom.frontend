import { Check, DoubleArrow, Send, ThumbDown } from '@mui/icons-material';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { IGradeReview, IUser, RequestReviewStatus } from 'common/interfaces';
import Utils from 'common/utils';
import { useAuth } from 'components';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gradeReviewSx } from './style';
import { StudentGradeReviewType } from './type';
import { GradeComments } from './subcomponents';

const data: IGradeReview[] = [
  {
    student_account: '61c87326b32ed8c2d648c9f1',
    assignment_id: '61c80b3db32ed8c2d648c7fe',
    grading_id: '61c80b3db32ed8c2d648c7fe',
    expect_mark: 10,
    status: RequestReviewStatus.APPROVED,
    comments: [
      {
        author: {
          avatar: '',
          email: 'tan@mail.com',
          first_name: 'tan',
          last_name: 'nguyen',
          student_id: '18127136',
        },
        message: 'Em xung dang 10 diem',
        created_at: 1641051622252,
      },
      {
        author: {
          _id: '61c80aabb32ed8c2d648c7c3',
          last_name: 'Nguyen',
          first_name: 'Long',
          avatar: 'https://ik.imagekit.io/mv9a74wawbo/image-1640536492182631148320_0jujI53l0.png',
          student_id: '',
          email: 'long@mail.com',
        },
        message: 'Em khong xung dang',
        created_at: 1641051622252,
      },
      {
        author: {
          avatar: '',
          email: 'tan@mail.com',
          first_name: 'tan',
          last_name: 'nguyen',
          student_id: '18127136',
        },
        message: 'Em xung dang 10 diem',
        created_at: 1641051622252,
      },
      {
        author: null,
        message: 'Your teacher accepted and updated your grade. This review is marked as APPROVED and no longer available.',
        created_at: 1641051622252,
      },
    ],
  },
  {
    student_account: '61c87326b32ed8c2d648c9f1',
    assignment_id: '61c80b3db32ed8c2d648c7fe',
    grading_id: '61c80b3db32ed8c2d648c7fe',
    expect_mark: 10,
    status: RequestReviewStatus.OPEN,
    comments: [
      {
        author: {
          _id: '61c80aabb32ed8c2d648c7c3',
          last_name: 'Nguyen',
          first_name: 'Long',
          avatar: 'https://ik.imagekit.io/mv9a74wawbo/image-1640536492182631148320_0jujI53l0.png',
          student_id: '',
          email: 'long@mail.com',
        },
        message: 'Em xung dang 10 diem',
        created_at: 1641051622252,
      },
    ],
  },
];

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
    if (status === RequestReviewStatus.OPEN) return <DoubleArrow className="icon" />;
    else if (status === RequestReviewStatus.REJECTED) return <ThumbDown className="icon" />;
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
                    <Typography className="time">123</Typography>
                    <Typography className="title" component="span">
                      You request a grade review with a expeted grade of {gr.expect_mark}
                    </Typography>

                    <GradeComments gr={gr} userData={userData as IUser} handleSendBtn={handleSendBtn} />
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
