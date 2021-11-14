export type SnackbarProps = {
  open: boolean;
  msg: string;
  severity: 'warning' | 'info' | 'error' | 'success';
  handleClose: () => void;
};
