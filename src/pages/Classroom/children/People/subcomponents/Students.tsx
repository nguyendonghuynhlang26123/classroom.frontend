import { ManageAccounts, Sync, PersonAddOutlined } from '@mui/icons-material';
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import { ClassStudents, UserRole, IStudentInfo } from 'common/interfaces';
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

  return data ? (
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
        {!data
          ? 'Loading for results...'
          : data.map((u: IStudentInfo, idx: number) => (
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
                  {role === UserRole.STUDENT && u.status === 'NOT_SYNCED' && !studentId && (
                    <Tooltip title={'Synced your account with this account'}>
                      <IconButton onClick={() => syncBtnHandle(u)}>
                        <Sync />
                      </IconButton>
                    </Tooltip>
                  )}
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
            ))}
      </List>
    </React.Fragment>
  ) : (
    <></>
  );
};
