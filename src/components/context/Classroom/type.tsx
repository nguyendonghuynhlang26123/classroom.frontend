import { IClassroom, UserRole } from 'common/interfaces';
export type ClassroomContextProps = {
  classData: IClassroom | null;
  role: UserRole;
};
