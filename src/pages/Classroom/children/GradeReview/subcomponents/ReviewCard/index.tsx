import React from 'react';
import { ListItemAvatar, Avatar, ListItemText, Typography, Stack, ListItem, Divider, Box } from '@mui/material';
import Utils from 'common/utils';
import { cardSx } from './style';
import { ReviewCardProps } from './type';
import { IUser } from 'common/interfaces';

export const ReviewCard = ({ data, handleOnClick }: ReviewCardProps) => {
  const [author, setAuthor] = React.useState<IUser>();

  React.useEffect(() => {
    if (data) setAuthor(data.student_account as IUser);
    console.log('log ~ file: index.tsx ~ line 13 ~ React.useEffect ~ data', data);
  }, [data]);

  return (
    <>
      {data && author && (
        <>
          <ListItem sx={cardSx} onClick={() => handleOnClick(data._id as string)}>
            <ListItemAvatar>
              <Avatar className="avatar" />
            </ListItemAvatar>
            {author && (
              <ListItemText
                className="text"
                primary={Utils.getFullName(author.first_name, author.last_name) + ' ' + (author.student_id ? `(${author.student_id})` : '')}
                secondary={
                  <Typography noWrap className="description">
                    {data.comments[0].message}
                  </Typography>
                }
              />
            )}
            <Box className="marks">
              <Typography>10</Typography>
              <Typography>↓</Typography>
              <Typography>{data.expect_mark}</Typography>
            </Box>
          </ListItem>

          <Divider />
        </>
      )}
    </>
  );
};
