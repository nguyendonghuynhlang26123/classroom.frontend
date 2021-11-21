export type InviteFormProps = {
  open: boolean;
  title: string;
  handleClose: () => void;
  onSubmit: (email: string) => void;
};
