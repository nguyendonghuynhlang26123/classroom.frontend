import React from 'react';
import { ListItemAvatar, Avatar, ListItemText, Typography, Stack, ListItem, Divider, Box } from '@mui/material';
import Utils from 'common/utils';
import { cardSx } from './style';

export const ReviewCard = () => {
  return (
    <>
      <ListItem sx={cardSx}>
        <ListItemAvatar>
          <Avatar className="avatar" />
        </ListItemAvatar>
        <ListItemText
          className="text"
          primary={Utils.getFullName('Long', 'Nguyen') + `(${18127136})`}
          secondary={
            <Typography noWrap className="description">
              Em xung dang duoc 10 diem chat luong. Boi vi em da co gang het suc. Em xung dang duoc 10 diem chat luong. Boi vi em da co gang
              het suc
            </Typography>
          }
        />
        <Box className="marks">
          <Typography>10</Typography>
          <Typography>↓</Typography>
          <Typography>10</Typography>
        </Box>
      </ListItem>

      <Divider />
    </>
  );
};
