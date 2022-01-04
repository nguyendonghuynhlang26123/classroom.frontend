import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Avatar, Box, Button, Typography } from '@mui/material';
import BrainStorm from 'assets/images/brainstorm.svg';
import { ActivityType, IActivity } from 'common/interfaces';
import Utils from 'common/utils';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { activitySx } from './style';
import { NoResourceDisplay } from 'components';

export const ClassActivities = ({ data }: { data: IActivity[] }) => {
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
