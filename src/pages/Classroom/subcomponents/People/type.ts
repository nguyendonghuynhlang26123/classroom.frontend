import { Classroom, UserRole } from 'common/interfaces';
export type PeopleTabProps = {
  role: UserRole;
};

export type InviteFormProps = {
  open: boolean;
  title: string;
  handleClose: () => void;
  onSubmit: (email: string) => void;
};
