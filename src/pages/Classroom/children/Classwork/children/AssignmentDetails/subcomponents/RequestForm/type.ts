import { IAssignment } from 'common/interfaces';

export type RequestFormProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (message: string, mark: number) => void;
  assignment: IAssignment;
};
