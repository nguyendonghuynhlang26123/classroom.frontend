import { Mail, PersonAddOutlined } from '@mui/icons-material';
import {
  Avatar,
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
import { styleSx } from './style';

type TeachersProps = {
  role: UserRole;
  onInvite: () => void;
  data: IClassroomUser[];
};

export const Teachers = ({ role, onInvite, data }: TeachersProps) => {
  return (
    <React.Fragment>
      <Stack direction="row" justifyContent="space-between" sx={styleSx.header}>
        <Typography>Teachers 👨‍🏫</Typography>
        {role !== UserRole.STUDENT && (
          <IconButton onClick={onInvite}>
            <PersonAddOutlined />
          </IconButton>
        )}
      </Stack>
      <List>
        {!data
          ? 'Loading for results...'
          : data.map((u: IClassroomUser, idx: number) => (
              <React.Fragment key={idx}>
                <ListItem alignItems="flex-start" sx={styleSx.listItem}>
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
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
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
  );
};
