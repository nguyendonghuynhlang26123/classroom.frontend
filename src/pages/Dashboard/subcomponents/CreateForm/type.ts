import { IClassroomBody } from 'common/interfaces';

export type FormModalProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (form: IClassroomBody) => void;
};
