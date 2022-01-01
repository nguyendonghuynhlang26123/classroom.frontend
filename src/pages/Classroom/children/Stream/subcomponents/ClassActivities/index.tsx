import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Avatar, Box, Button, Typography } from '@mui/material';
import BrainStorm from 'assets/images/brainstorm.svg';
import { ActivityType, IActivity } from 'common/interfaces';
import Utils from 'common/utils';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { activitySx } from './style';
import { NoResourceDisplay } from 'components';

const dumb: IActivity[] = [
  {
    class_id: '',
    type: ActivityType.GRADING_FINALIZED,
    description: 'Tan Nguyen has published gradings for Quiz 2',
    actor: {
      _id: '61c87326b32ed8c2d648c9f1',
      last_name: 'nguyen',
      first_name: 'tan',
      avatar: '',
      student_id: '18127136',
      email: 'tan@mail.com',
    },
    assignment_id: '61c80b3db32ed8c2d648c7fe',
    created_at: 1641051622252,
  },
  {
    class_id: '',
    type: ActivityType.ASSIGNMENT_ADD,
    description: 'Long Huynh added a new assignment',
    actor: {
      _id: '61c80aabb32ed8c2d648c7c3',
      last_name: 'Nguyen',
      first_name: 'Long',
      avatar: 'https://ik.imagekit.io/mv9a74wawbo/image-1640536492182631148320_0jujI53l0.png',
      student_id: '',
      email: 'long@mail.com',
    },
    assignment_id: '61c80b2db32ed8c2d648c7f6',
    created_at: 1641051622252,
  },
  {
    class_id: '',
    type: ActivityType.CLASSROOM_INFO_UPDATE,
    description: 'Long Huynh has updated classroom details: Class name, section',
    actor: {
      _id: '61c80aabb32ed8c2d648c7c3',
      last_name: 'Nguyen',
      first_name: 'Long',
      avatar: 'https://ik.imagekit.io/mv9a74wawbo/image-1640536492182631148320_0jujI53l0.png',
      student_id: '',
      email: 'long@mail.com',
    },
    created_at: 1641051622252,
  },
  {
    class_id: '',
    type: ActivityType.CLASSROOM_INFO_UPDATE,
    description: 'Long Huynh has uploaded a new list of students for this class',
    actor: {
      _id: '61c80aabb32ed8c2d648c7c3',
      last_name: 'Nguyen',
      first_name: 'Long',
      avatar: 'https://ik.imagekit.io/mv9a74wawbo/image-1640536492182631148320_0jujI53l0.png',
      student_id: '',
      email: 'long@mail.com',
    },
    created_at: 1641051622252,
  },
  {
    class_id: '',
    type: ActivityType.TEACHER_JOIN,
    description: 'Tan Nguyen has joined this class as a teacher',
    actor: {
      _id: '61c87326b32ed8c2d648c9f1',
      last_name: 'nguyen',
      first_name: 'tan',
      avatar: '',
      student_id: '18127136',
      email: 'tan@mail.com',
    },
    created_at: 1641051622252,
  },
];
const data: IActivity[] = dumb;

export const ClassActivities = () => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const shouldShowViewBtn = (type: ActivityType) => {
    return type === ActivityType.ASSIGNMENT_ADD || type === ActivityType.GRADING_FINALIZED;
  };

  const handleViewBtn = (activity: IActivity) => {
    if (activity.type === ActivityType.ASSIGNMENT_ADD || activity.type === ActivityType.GRADING_FINALIZED)
      navigate(`/classroom/${id}/work/details/${activity.assignment_id}`);
  };
  return (
    <Box sx={activitySx.root}>
      {data && data.length > 0 ? (
        <>
          <Typography variant="h5">Activity</Typography>
          <Timeline sx={activitySx.activityContainer} position="right">
            {data.map((a: IActivity, i: number) => (
              <TimelineItem key={i} sx={activitySx.activityItem}>
                <TimelineSeparator>
                  {i !== 0 && i !== data.length - 1 && <TimelineConnector />}
                  <TimelineDot variant="outlined">
                    <Avatar className="icon" src={a.actor.avatar} />
                  </TimelineDot>
                  {i !== data.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent className="content">
                  <Box>
                    <Typography className="title" component="span">
                      {a.description}
                    </Typography>
                    <Typography className="time">{Utils.displayDate(a.created_at as number)}</Typography>
                  </Box>
                  {shouldShowViewBtn(a.type) && <Button onClick={() => handleViewBtn(a)}>View</Button>}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </>
      ) : (
        <Box className="notfound">
          <NoResourceDisplay
            title="There are no activity found in this class"
            img={BrainStorm}
            direction="row"
            description={
              <>
                This class is freshly created and has no recent activity!
                <br /> So chill !
              </>
            }
          />
        </Box>
      )}
    </Box>
  );
};
