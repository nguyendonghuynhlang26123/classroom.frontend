import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavbarProps } from './type';
import { drawerSx, navbarSx } from './style';
import { Menu } from '@mui/icons-material';
import { HomeOutlined, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export const Navbar = ({ children, items, toolbarComponents }: NavbarProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const [drawer, showDrawer] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
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
          <Divider />
          <ListItem>
            <ListItemText sx={drawerSx.textItem} primary="Enrolled" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText sx={drawerSx.textItem} primary="Teaching" />
          </ListItem>
          <Divider />
          <ListItemButton sx={drawerSx.btnItem} onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={'Setting'} />
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
