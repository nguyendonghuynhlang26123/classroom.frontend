import { IClassroom, UserRole } from 'common/interfaces';
export type ClassroomContextProps = {
  classData: IClassroom | null;
  studentId: string | null;
  role: UserRole;
};
