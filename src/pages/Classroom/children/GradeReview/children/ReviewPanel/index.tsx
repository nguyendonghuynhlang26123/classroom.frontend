import { GraphicEq, Send } from '@mui/icons-material';
import { Avatar, Box, Button, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import Utils from 'common/utils';
import { StudentCard, useAuth } from 'components';
import React from 'react';
import { reviewPanelSx } from './style';

const ReviewPanel = () => {
  const { userData } = useAuth();
  const [comment, setComment] = React.useState<string>('');

  return (
    <Box>
      <Box sx={reviewPanelSx.header}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Chip icon={<GraphicEq />} label="Open" color="primary" />
          <Typography> Quiz 1 </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button color="error">❌Reject</Button>
          <Button color="success">✔Approve</Button>
        </Stack>
      </Box>
      <Divider />
      <Box sx={reviewPanelSx.main}>
        <Stack sx={reviewPanelSx.info} direction="row" divider={<Divider orientation="vertical" variant="middle" flexItem />} spacing={3}>
          <Box className="student-container" sx={{ flex: 1 }}>
            <Typography className="title">Requester</Typography>
            {userData && <StudentCard data={userData} />}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography className="title">Request Details</Typography>
            <Box>
              <Stack direction="row" className="assignment-record">
                <Typography>Assignment name: </Typography>
                <Typography noWrap>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi assumenda aliquid nostrum accusantium dolore a nesciunt sit
                  quibusdam adipisci voluptatem impedit tenetur quaerat rem, quisquam aut repellat quo neque ex?
                </Typography>
              </Stack>
              <Stack direction="row" className="assignment-record">
                <Typography>Current grade: </Typography>
                <Typography>
                  <em> (last updated at: {Utils.displayDate(Date.now())}) </em>
                  10 / 10
                </Typography>
              </Stack>
              <Stack direction="row" className="assignment-record">
                <Typography>Request grade: </Typography>
                <Typography>10</Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>

        <Box sx={reviewPanelSx.commentSection}>
          <Typography className="title">Comments</Typography>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" />
              </ListItemAvatar>
              <ListItemText
                primary={Utils.getFullName('Long', 'Huynh')}
                secondary={
                  <React.Fragment>
                    <Typography component="span" className="time">
                      {Utils.displayDate(Date.now())}
                    </Typography>{' '}
                    - {'Mot minh tao chap het'}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" />
              </ListItemAvatar>
              <ListItemText
                primary={Utils.getFullName('Long', 'Huynh')}
                secondary={
                  <React.Fragment>
                    <Typography component="span" className="time">
                      {Utils.displayDate(Date.now())}
                    </Typography>{' '}
                    - {'Mot minh tao chap het'}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" />
              </ListItemAvatar>
              <ListItemText
                primary={Utils.getFullName('Long', 'Huynh')}
                secondary={
                  <React.Fragment>
                    <Typography component="span" className="time">
                      {Utils.displayDate(Date.now())}
                    </Typography>{' '}
                    - {'Mot minh tao chap het'}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" />
              </ListItemAvatar>
              <ListItemText
                primary={Utils.getFullName('Long', 'Huynh')}
                secondary={
                  <React.Fragment>
                    <Typography component="span" className="time">
                      {Utils.displayDate(Date.now())}
                    </Typography>{' '}
                    - {'Mot minh tao chap het'}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>

          <ListItem alignItems="center">
            <ListItemAvatar>
              <Avatar src={userData?.avatar} />
            </ListItemAvatar>
            <Stack direction="row" width="100%">
              <input value={comment} onChange={(ev) => setComment(ev.target.value)} placeholder="Say something" />
              <Button
                variant="contained"
                onClick={() => {
                  setComment('');
                }}
                disabled={!Boolean(comment)}
              >
                <Send />
              </Button>
            </Stack>
          </ListItem>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewPanel;
