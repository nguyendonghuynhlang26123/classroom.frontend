import { FormData } from '../../type';
export type DisclaimerProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: () => void;
};

export type FormModalProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (form: FormData) => void;
};

export type JoinFormProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (form: { code: string }) => void;
};

export type AddBtnProps = {
  handleCreateClass: (form: FormData) => void;
  handleJoinClass: (form: { code: string }) => void;
};
