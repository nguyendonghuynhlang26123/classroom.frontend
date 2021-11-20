import { IconButton, Menu, MenuItem } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import React from 'react';
import { Disclaimer } from './Disclaimer';
import { CreateForm } from './CreateForm';
import { JoinForm } from './JoinForm';
import { AddBtnProps } from './type';
import { IClassroomBody } from 'common/interfaces';

export const AddBtn = ({ handleCreateClass, handleJoinClass }: AddBtnProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [disclaimerModal, showDisclamer] = React.useState<boolean>(false);
  const [createForm, showCreateForm] = React.useState<boolean>(false);
  const [joinForm, showJoinForm] = React.useState<boolean>(false);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const hideAll = () => {
    setAnchorEl(null);
    showDisclamer(false);
    showCreateForm(false);
    showJoinForm(false);
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
            showJoinForm(true);
          }}
        >
          Join class
        </MenuItem>
        <MenuItem onClick={() => showDisclamer(true)}>Create class</MenuItem>
      </Menu>

      {/* Disclaimer */}
      <Disclaimer
        open={disclaimerModal}
        handleClose={hideAll}
        onSubmit={() => {
          hideAll();
          showCreateForm(true);
        }}
      />

      {/* Create Form */}
      <CreateForm
        open={createForm}
        handleClose={hideAll}
        onSubmit={(form: IClassroomBody) => {
          handleCreateClass(form);
          hideAll();
        }}
      />
      <JoinForm
        open={joinForm}
        handleClose={hideAll}
        onSubmit={(data: { code: string }) => {
          handleJoinClass(data);
          hideAll();
        }}
      />
    </>
  );
};
