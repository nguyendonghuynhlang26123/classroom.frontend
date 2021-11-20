import { CreateClassroom } from './../../../../common/interfaces/classes/classroom.interface';
export type DisclaimerProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: () => void;
};

export type FormModalProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (form: CreateClassroom) => void;
};

export type JoinFormProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (form: { code: string }) => void;
};

export type AddBtnProps = {
  handleCreateClass: (form: CreateClassroom) => void;
  handleJoinClass: (form: { code: string }) => void;
};
