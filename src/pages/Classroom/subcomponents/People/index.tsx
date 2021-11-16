import { Mail, PersonAddOutlined } from '@mui/icons-material';
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
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { ClassroomUser, UserRole } from 'common/interfaces';
import ClassroomService from '../../service';
import React from 'react';
import { peopleTabSx } from './style';
import { PeopleTabProps } from './type';
import { useParams } from 'react-router';

const c: ClassroomUser[] = [
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

export const PeopleTab = ({ role }: PeopleTabProps) => {
  const { id } = useParams();
  const service = new ClassroomService();
  const [data, setData] = React.useState<ClassroomUser[]>([]);

  React.useEffect(() => {
    if (id) {
      service.getClassUsers(id).then((users: ClassroomUser[]) => {
        console.log('log ~ file: index.tsx ~ line 100 ~ service.getClassUsers ~ users', users);
        setData(users);
      });
    }
  });

  return (
    <Container maxWidth={false} sx={peopleTabSx.root}>
      <Stack direction="row" justifyContent="space-between" sx={peopleTabSx.header}>
        <Typography>Teachers</Typography>
        <IconButton hidden={role !== UserRole.STUDENT}>
          <PersonAddOutlined />
        </IconButton>
      </Stack>
      <List>
        {data &&
          data
            .filter((u: ClassroomUser) => u.role !== UserRole.STUDENT)
            .map((u: ClassroomUser, idx: number) => (
              <>
                <ListItem alignItems="flex-start" key={idx}>
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
      <Stack direction="row" justifyContent="space-between" sx={peopleTabSx.header}>
        <Typography>Classmate</Typography>
        <IconButton hidden={role !== UserRole.STUDENT}>
          <PersonAddOutlined />
        </IconButton>
      </Stack>
      <List>
        {data &&
          data
            .filter((u: ClassroomUser) => u.role === UserRole.STUDENT)
            .map((u: ClassroomUser, idx: number) => (
              <>
                <ListItem alignItems="center" key={idx}>
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
