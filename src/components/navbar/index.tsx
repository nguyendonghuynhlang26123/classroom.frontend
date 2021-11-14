import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavbarProps, DrawerItemType } from './type';
import { drawerItemSx, drawerListSx, navbarSx } from './style';
import { Menu } from '@mui/icons-material';

export const Navbar = ({ children, items, toolbarComponents }: NavbarProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const [drawer, showDrawer] = React.useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    showDrawer(open);
  };

  const getListItemByType = (item: DrawerItemType, index: number): React.ReactElement => {
    switch (item.type) {
      case 'group':
        return <>{item?.children?.map((subItem, subIndex) => getListItemByType(subItem, subIndex))}</>;
      case 'item':
        return (
          <ListItemButton selected={index === 1} key={index} sx={drawerItemSx}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText sx={{ fontSize: 14, fontWeight: 'bold' }} primary={item.title} />
          </ListItemButton>
        );
      case 'divider':
        return <div></div>;
    }
    return <div></div>;
  };

  return (
    <React.Fragment>
      {/* <Drawer anchor={'left'} open={drawer} onClose={toggleDrawer(false)}>
        <List sx={drawerListSx} role="presentation" onKeyDown={toggleDrawer(false)}>
          {items.map((item, idx) => getListItemByType(item, idx))}
        </List>
      </Drawer> */}
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
