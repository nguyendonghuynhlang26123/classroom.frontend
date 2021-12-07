export type JoinFormProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (form: { code: string }) => void;
};
