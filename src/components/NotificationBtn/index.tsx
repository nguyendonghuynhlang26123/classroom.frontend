import {
  Avatar,
  IconButton,
  List,
  ListItem,
  Badge,
  ListItemAvatar,
  ListItemText,
  Popover,
  Divider,
  Typography,
  CircularProgress,
  ListItemButton,
} from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllNotificationQuery } from 'services';
import { INotification } from 'common/interfaces';
import Utils from 'common/utils';
import { notificationBtnSx } from './style';
import { useNotification } from 'components';

export const NotificationBtn = () => {
  const navigate = useNavigate();
  const { notifications, seen, isSeen, newNotiCount } = useNotification();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
        id={'simple-popover'}
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
        {notifications ? (
          <List sx={notificationBtnSx.container}>
            {notifications.length > 0 ? (
              notifications.slice(0, 4).map((n: INotification, i) => (
                <React.Fragment key={i}>
                  <ListItemButton alignItems="flex-start" onClick={() => handleOnClick(n)}>
                    <ListItemAvatar>
                      <Avatar alt={n.actor_id.first_name} src={n.actor_id.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={isSeen(n._id as string) ? {} : { ...notificationBtnSx.notSeen }}
                      id="not-seen"
                      primary={n.type === 'GRADE_FINALIZE' ? 'Grade composition update' : 'Grade Request update'}
                      secondary={
                        <React.Fragment>
                          <Typography sx={notificationBtnSx.secondaryText} component="span" variant="body2" color="text.primary">
                            {Utils.getFullName(n.actor_id.first_name, n.actor_id.last_name)}
                          </Typography>
                          {` - ${n.description}`}
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </React.Fragment>
              ))
            ) : (
              <ListItemText sx={{ px: 2 }}>No notification</ListItemText>
            )}

            <ListItemButton alignItems="center" sx={notificationBtnSx.viewAllBtn} color="primary">
              View All
            </ListItemButton>
          </List>
        ) : (
          <CircularProgress />
        )}
      </Popover>
    </>
  );
};
