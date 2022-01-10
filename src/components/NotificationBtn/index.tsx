import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Link,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { INotification } from 'common/interfaces';
import Utils from 'common/utils';
import { useNotification } from 'components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationBtnSx } from './style';

export const NotificationBtn = () => {
  const navigate = useNavigate();
  const { notifications, seen, isSeen, newNotiCount, isRemoved, remove } = useNotification();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [availableNotis, setAvailableNoti] = React.useState<INotification[]>(notifications);

  React.useEffect(() => {
    setAvailableNoti(notifications.filter((n) => !isRemoved(n._id as string)));
  }, [notifications, isRemoved]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick = (n: INotification) => {
    seen(n._id as string);
    handleClose();
    if (n.type === 'GRADE_FINALIZE') navigate(`/classroom/${n.class_id}/work/details/${n.assignment._id}`);
    else if (n.grading) navigate(`/classroom/${n.class_id}/grade-reviews`);
    else navigate(`/classroom/${n.class_id}`);
  };

  const handleMarkAsRead = (n: INotification) => (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    seen(n._id as string);
  };

  const handleRemove = (n: INotification) => (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    seen(n._id as string);
    remove(n._id as string);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="notification-menu"
        aria-controls="notification-menu"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Badge badgeContent={newNotiCount} color="primary">
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {availableNotis ? (
          <List sx={notificationBtnSx.container}>
            {availableNotis.length > 0 ? (
              availableNotis.map((n: INotification, i) => (
                <React.Fragment key={i}>
                  <ListItemButton alignItems="flex-start" onClick={() => handleOnClick(n)}>
                    <ListItemAvatar>
                      <Avatar alt={n.actor_id.first_name} src={n.actor_id.avatar} />
                    </ListItemAvatar>
                    <Box>
                      <ListItemText
                        sx={isSeen(n._id as string) ? {} : { ...notificationBtnSx.notSeen }}
                        primary={n.type === 'GRADE_FINALIZE' ? 'Grade composition update' : 'Grade Request update'}
                        secondary={<React.Fragment>{`${n.description}`}</React.Fragment>}
                      />
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={notificationBtnSx.actionBtns}>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: 12 }}>
                          {Utils.displayDate(n.created_at as number)}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          <Link href="#" underline="hover" onClick={handleRemove(n)} color="error">
                            Remove
                          </Link>
                          <Link href="#" underline="hover" onClick={handleMarkAsRead(n)}>
                            Mark as read
                          </Link>
                        </Stack>
                      </Stack>
                    </Box>
                  </ListItemButton>
                </React.Fragment>
              ))
            ) : (
              <ListItemText sx={{ px: 2 }}>No notification</ListItemText>
            )}
          </List>
        ) : (
          <CircularProgress />
        )}
      </Popover>
    </>
  );
};
