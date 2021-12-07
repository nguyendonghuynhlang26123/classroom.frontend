import { IconButton, Menu, MenuItem } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import React from 'react';
import { AddBtnProps } from './type';

export const AddBtn = ({ createOptionChosen, joinOptionChosen }: AddBtnProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AddRoundedIcon sx={{ fontSize: 24 }} />
      </IconButton>
      <Menu
        id="menu-add"
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': 'add-button',
        }}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setAnchorEl(null)}
        keepMounted
      >
        <MenuItem
          onClick={() => {
            joinOptionChosen();
            setAnchorEl(null);
          }}
        >
          Join class
        </MenuItem>
        <MenuItem
          onClick={() => {
            createOptionChosen();
            setAnchorEl(null);
          }}
        >
          Create class
        </MenuItem>
      </Menu>
    </>
  );
};
