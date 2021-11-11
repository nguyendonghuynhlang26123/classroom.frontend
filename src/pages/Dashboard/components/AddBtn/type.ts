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

export type AddBtnProps = {
  handleSubmit: (form: FormData) => void;
};
