import { Mail } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { ClassroomUser, UserRole } from 'common/interfaces';
import React from 'react';
import { peopleTabSx } from './style';

const data: ClassroomUser[] = [
  {
    user: {
      studentId: '',
      email: 'long@mail.com',
      avatar: '',
      last_name: 'Huynh',
      first_name: 'Long',
    },
    status: 'ACTIVATED',
    role: UserRole.ADMIN,
  },
  {
    user: {
      studentId: '',
      email: 'long@mail.com',
      avatar: '',
      last_name: 'Huynh',
      first_name: 'Long',
    },
    status: 'ACTIVATED',
    role: UserRole.TEACHER,
  },
  {
    user: {
      studentId: '',
      email: 'long@mail.com',
      avatar: '',
      last_name: 'Huynh',
      first_name: 'Long',
    },
    status: 'ACTIVATED',
    role: UserRole.STUDENT,
  },
  {
    user: {
      studentId: '',
      email: 'long@mail.com',
      avatar: '',
      last_name: 'Huynh',
      first_name: 'Long',
    },
    status: 'ACTIVATED',
    role: UserRole.STUDENT,
  },
  {
    user: {
      studentId: '',
      email: 'long@mail.com',
      avatar: '',
      last_name: 'Huynh',
      first_name: 'Long',
    },
    status: 'ACTIVATED',
    role: UserRole.STUDENT,
  },
  {
    user: {
      studentId: '',
      email: 'long@mail.com',
      avatar: '',
      last_name: 'Huynh',
      first_name: 'Long',
    },
    status: 'ACTIVATED',
    role: UserRole.STUDENT,
  },
];

export const PeopleTab = () => {
  return (
    <Container maxWidth={false} sx={peopleTabSx.root}>
      {[]}

      <Box sx={peopleTabSx.header}>
        <Typography>Teachers</Typography>
      </Box>
      <List>
        {data
          .filter((u: ClassroomUser) => u.role !== UserRole.STUDENT)
          .map((u: ClassroomUser, idx: number) => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {u.user.avatar ? (
                    <Avatar alt={u.user.first_name} src={u.user.avatar} sx={{ bgcolor: 'primary.main' }} />
                  ) : (
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{u.user.first_name.charAt(0)}</Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={u.user.first_name + ' ' + u.user.last_name}
                  secondary={
                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                      {u.user.email}
                    </Typography>
                  }
                />
                <Tooltip title={`Send Mail to ${u.user.email}`}>
                  <IconButton href={`mailto:${u.user.email}`}>
                    <Mail />
                  </IconButton>
                </Tooltip>
              </ListItem>
              <Divider />
            </>
          ))}
      </List>
      <Box sx={peopleTabSx.header}>
        <Typography>Classmates</Typography>
      </Box>
      <List>
        {data
          .filter((u: ClassroomUser) => u.role === UserRole.STUDENT)
          .map((u: ClassroomUser, idx: number) => (
            <>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  {u.user.avatar ? (
                    <Avatar alt={u.user.first_name} src={u.user.avatar} sx={{ bgcolor: 'primary.main' }} />
                  ) : (
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{u.user.first_name.charAt(0)}</Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={u.user.first_name + ' ' + u.user.last_name}
                  secondary={
                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                      {u.user.email}
                    </Typography>
                  }
                />
                <Tooltip title={`Send Mail to ${u.user.email}`}>
                  <IconButton href={`mailto:${u.user.email}`}>
                    <Mail />
                  </IconButton>
                </Tooltip>
              </ListItem>
              <Divider />
            </>
          ))}
      </List>
    </Container>
  );
};
