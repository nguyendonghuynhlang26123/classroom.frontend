import { IconButton, Menu, MenuItem } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import React from 'react';
import { Disclaimer } from './Disclaimer';
import { FormModal } from './FormModal';
import { AddBtnProps } from './type';
import { FormData } from '../../type';

export const AddBtn = ({ handleSubmit }: AddBtnProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [disclaimerModal, showDisclamer] = React.useState<boolean>(false);
  const [formModal, showFormModal] = React.useState<boolean>(false);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const hideAll = () => {
    setAnchorEl(null);
    showDisclamer(false);
    showFormModal(false);
  };

  return (
    <>
      <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
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
        <MenuItem onClick={() => {}}>Join class</MenuItem>
        <MenuItem onClick={() => showDisclamer(true)}>Create class</MenuItem>
      </Menu>

      {/* Disclaimer */}
      <Disclaimer
        open={disclaimerModal}
        handleClose={hideAll}
        onSubmit={() => {
          hideAll();
          showFormModal(true);
        }}
      />

      {/* Form */}
      <FormModal
        open={formModal}
        handleClose={hideAll}
        onSubmit={(form: FormData) => {
          handleSubmit(form);
          hideAll();
        }}
      />
    </>
  );
};
