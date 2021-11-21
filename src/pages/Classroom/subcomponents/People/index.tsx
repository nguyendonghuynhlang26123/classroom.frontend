import { Mail, PersonAddOutlined } from '@mui/icons-material';
import {
  Avatar,
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
import { IClassroomUser, UserRole } from 'common/interfaces';
import React from 'react';
import { useParams } from 'react-router';
import { useGetClassUsersQuery, useInviteUserMutation } from 'services/api';
import { InviteForm } from './InviteForm';
import { peopleTabSx } from './style';
import { PeopleTabProps } from './type';
import { toast } from 'react-toastify';

export const PeopleTab = ({ role }: PeopleTabProps) => {
  const { id } = useParams();
  const [inviteTeacher, showTeacherInviteForm] = React.useState<boolean>(false);
  const [inviteStudent, showStudentInviteForm] = React.useState<boolean>(false);
  const { data, isLoading } = useGetClassUsersQuery(id as string);
  const [submitInvitation] = useInviteUserMutation();

  const checkRole = (role: UserRole, type: 'Teachers' | 'Students') => {
    if (type === 'Teachers') return role !== UserRole.STUDENT;
    else return role === UserRole.STUDENT;
  };

  const inviteBtnHandler = (type: 'Teachers' | 'Students') => {
    if (type === 'Teachers') showTeacherInviteForm(true);
    else showStudentInviteForm(true);
  };

  const submitInvite = (invitedRole: UserRole, email: string) => {
    submitInvitation({
      class_id: id as string,
      role: invitedRole,
      email: email,
    })
      .unwrap()
      .then(() => {
        toast.success('Email submited!');
      })
      .catch((err) => {
        if (err.status === 409) toast.warn('This user has been added to this class');
      });
  };

  return (
    <Container maxWidth={false} sx={peopleTabSx.root}>
      {['Teachers', 'Students'].map((t: any) => (
        <React.Fragment key={t}>
          <Stack direction="row" justifyContent="space-between" sx={peopleTabSx.header}>
            <Typography>{t}</Typography>
            {role !== UserRole.STUDENT && (
              <IconButton
                onClick={() => {
                  inviteBtnHandler(t);
                }}
              >
                <PersonAddOutlined />
              </IconButton>
            )}
          </Stack>
          <List>
            {isLoading || !data
              ? 'Loading for results...'
              : data
                  .filter(
                    (u: IClassroomUser) =>
                      checkRole(u.role, t) && (role !== UserRole.STUDENT || u.status !== 'INACTIVATED'),
                  )
                  .map((u: IClassroomUser, idx: number) => (
                    <React.Fragment key={idx}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          {u.user_id.avatar ? (
                            <Avatar
                              alt={u.user_id.first_name}
                              src={u.user_id.avatar}
                              sx={{ bgcolor: 'primary.main' }}
                            />
                          ) : (
                            <Avatar sx={{ bgcolor: 'primary.main' }}>{u.user_id.first_name.charAt(0)}</Avatar>
                          )}
                        </ListItemAvatar>
                        <ListItemText
                          primary={u.user_id.first_name + ' ' + u.user_id.last_name}
                          secondary={
                            <>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {u.user_id.email}
                              </Typography>
                              {u.status === 'INACTIVATED' && ' - (Inviting)'}
                            </>
                          }
                        />
                        <Tooltip title={`Send Mail to ${u.user_id.email}`}>
                          <IconButton href={`mailto:${u.user_id.email}`}>
                            <Mail />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
          </List>
        </React.Fragment>
      ))}

      <InviteForm
        title="Invite Teachers"
        open={inviteTeacher}
        handleClose={() => showTeacherInviteForm(false)}
        onSubmit={(email: string) => {
          submitInvite(UserRole.TEACHER, email);
          showTeacherInviteForm(false);
        }}
      />

      <InviteForm
        title="Invite students"
        open={inviteStudent}
        handleClose={() => showStudentInviteForm(false)}
        onSubmit={(email: string) => {
          submitInvite(UserRole.STUDENT, email);
          showStudentInviteForm(false);
        }}
      />
    </Container>
  );
};
