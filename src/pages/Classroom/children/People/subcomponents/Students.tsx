import { ManageAccounts, PersonAddOutlined } from '@mui/icons-material';
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import NotFoundImg from 'assets/images/student.svg';
import { IStudentInfo, UserRole } from 'common/interfaces';
import { NoResourceDisplay } from 'components';
import React from 'react';
import { styleSx } from './style';

type StudentsProps = {
  role: UserRole;
  studentId: string | null | undefined;
  data: IStudentInfo[] | undefined;
  onInvite: () => void;
  onBtnSyncClick: (student: IStudentInfo) => void;
};

export const Students = ({ role, studentId, data, onInvite, onBtnSyncClick }: StudentsProps) => {
  const syncBtnHandle = (student: IStudentInfo) => {
    onBtnSyncClick(student);
  };

  return (
    <React.Fragment>
      <Stack direction="row" justifyContent="space-between" sx={styleSx.header}>
        <Typography>Students 👨‍🎓</Typography>
        {role !== UserRole.STUDENT && (
          <IconButton onClick={onInvite}>
            <PersonAddOutlined />
          </IconButton>
        )}
      </Stack>
      <List>
        {!data ? (
          'Loading for results...'
        ) : data.length > 0 ? (
          data.map((u: IStudentInfo, idx: number) => (
            <React.Fragment key={idx}>
              <ListItem alignItems="center" sx={styleSx.listItem}>
                <ListItemAvatar>
                  {u.user_id ? <Avatar alt={u.user_id.first_name} src={u.user_id.avatar} sx={{ bgcolor: 'primary.main' }} /> : <Avatar />}
                </ListItemAvatar>
                <ListItemText
                  primary={u.student_name}
                  secondary={
                    <>
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        {u.student_id}
                      </Typography>
                      {u.status === 'SYNCED' &&
                        u.user_id &&
                        ` - Synced with ${u.user_id.first_name + ' ' + u.user_id.last_name} (${u.user_id.email})`}
                    </>
                  }
                />

                {role !== UserRole.STUDENT && (
                  <Tooltip title={'Mannually set account for this student account'}>
                    <IconButton onClick={() => syncBtnHandle(u)}>
                      <ManageAccounts />
                    </IconButton>
                  </Tooltip>
                )}
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : role === UserRole.STUDENT ? (
          <NoResourceDisplay
            title="Student list empty!"
            direction="row"
            img={NotFoundImg}
            description={
              <>
                Please contact your teacher <br /> to upload student list for this classroom
              </>
            }
          />
        ) : (
          <NoResourceDisplay
            title="Student list empty!"
            direction="row"
            img={NotFoundImg}
            description={
              <>
                Please upload student list <br /> by clicking the button below
              </>
            }
            onClick={() => {}}
          />
        )}
      </List>
    </React.Fragment>
  );
};
