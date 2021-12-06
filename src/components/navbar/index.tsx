import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { NavbarProps } from './type';
import { drawerSx, navbarSx } from './style';
import { Menu } from '@mui/icons-material';
import { HomeOutlined, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { IClassroom } from 'common/interfaces';

export const Navbar = ({ children, classrooms, toolbarComponents }: NavbarProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const [drawer, showDrawer] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    showDrawer(open);
  };

  return (
    <React.Fragment>
      <Drawer anchor={'left'} open={drawer} onClose={toggleDrawer(false)}>
        <List sx={drawerSx.list} role="presentation" onKeyDown={toggleDrawer(false)}>
          <ListItemButton sx={drawerSx.btnItem} onClick={() => navigate('/')}>
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary={'Classes'} />
          </ListItemButton>
          {classrooms && classrooms.length > 0 && (
            <>
              <Divider />
              <ListItem>
                <ListItemText sx={drawerSx.textItem} primary="Classrooms" />
              </ListItem>
              {classrooms.map((c: IClassroom, index: number) => (
                <ListItemButton
                  sx={drawerSx.btnItem}
                  key={index}
                  onClick={() => {
                    navigate(`/classroom/${c._id}`);
                    showDrawer(false);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{c.title.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <div className="not-overflowed">{c.title}</div>
                  </ListItemText>
                </ListItemButton>
              ))}
              <Divider sx={{ mt: 2 }} />
            </>
          )}

          <ListItemButton sx={drawerSx.btnItem} onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={'Profile Setting'} />
          </ListItemButton>
        </List>
      </Drawer>
      <AppBar elevation={trigger ? 4 : 0} sx={navbarSx}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>
          {children}
        </Toolbar>
        {toolbarComponents}
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};
