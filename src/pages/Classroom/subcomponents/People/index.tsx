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
import { ClassroomUser, UserRole } from 'common/interfaces';
import ClassroomService from '../../service';
import React from 'react';
import { peopleTabSx } from './style';
import { PeopleTabProps } from './type';
import { useParams } from 'react-router';
import { InviteForm } from './InviteForm';
import { useAppDispatch } from 'store/hooks';
import { showMessage } from 'store/slices';

export const PeopleTab = ({ role }: PeopleTabProps) => {
  const { id } = useParams();
  const service = new ClassroomService();
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<ClassroomUser[]>([]);
  const [inviteTeacher, showTeacherInviteForm] = React.useState<boolean>(false);
  const [inviteStudent, showStudentInviteForm] = React.useState<boolean>(false);

  const fetchData = (classId: string) => {
    service.getClassUsers(classId).then((users: ClassroomUser[]) => {
      setData(users);
    });
  };

  React.useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, []);

  const checkRole = (role: UserRole, type: 'Teachers' | 'Students') => {
    if (type === 'Teachers') return role !== UserRole.STUDENT;
    else return role === UserRole.STUDENT;
  };

  const inviteBtnHandler = (type: 'Teachers' | 'Students') => {
    if (type === 'Teachers') showTeacherInviteForm(true);
    else showStudentInviteForm(true);
  };

  const submitInvite = (invitedRole: UserRole, email: string) => {
    service
      .submitInvitation({
        class_id: id as string,
        role: invitedRole,
        email: email,
      })
      .then((d) => {
        if (id) fetchData(id);
        dispatch(showMessage({ message: 'Email submited!' }));
      })
      .catch((err) => {
        dispatch(showMessage({ message: 'Error when submitted invitation! Reason: ' + err.message, type: 'error' }));
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
            {data &&
              data
                .filter(
                  (u: ClassroomUser) =>
                    checkRole(u.role, t) && (role !== UserRole.STUDENT || u.status !== 'INACTIVATED'),
                )
                .map((u: ClassroomUser, idx: number) => (
                  <React.Fragment key={idx}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        {u.user_id.avatar ? (
                          <Avatar alt={u.user_id.first_name} src={u.user_id.avatar} sx={{ bgcolor: 'primary.main' }} />
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
