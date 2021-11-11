import React from 'react';
export type SimpleDialogPropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactElement;

  [x: string]: any; //other props
};
