import React from 'react';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { IGradeReview, IUser, RequestReviewStatus } from 'common/interfaces';
import Utils from 'common/utils';
import { reviewCommentSx } from './style';
import { GradeCommentProps } from './type';
import { Send } from '@mui/icons-material';

export const GradeReviewComments = ({ gr, handleSendBtn, userData }: GradeCommentProps) => {
  const [comment, setComment] = React.useState<string>('');

  return (
    <>
      <List>
        {gr.comments.map(
          (comment, j) =>
            comment.author && (
              <React.Fragment key={j}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={(comment.author as IUser).avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    className="title"
                    primary={Utils.getFullName((comment.author as IUser).first_name, (comment.author as IUser).last_name)}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" className="time">
                          {Utils.displayDate(comment.created_at)}
                        </Typography>{' '}
                        - {comment.message}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ),
        )}
      </List>

      {gr.status === RequestReviewStatus.OPEN ? (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={userData?.avatar} />
            </ListItemAvatar>
            <Box sx={reviewCommentSx}>
              <input value={comment} onChange={(ev) => setComment(ev.target.value)} placeholder="Say something" />
              <Button
                variant="contained"
                onClick={() => {
                  handleSendBtn(gr._id as string, comment);
                  setComment('');
                }}
                disabled={!Boolean(comment)}
              >
                <Send />
              </Button>
            </Box>
          </ListItem>
        </>
      ) : (
        <Typography className="info" component="span" color="success.main">
          * {gr.comments[gr.comments.length - 1].message}
        </Typography>
      )}
    </>
  );
};
