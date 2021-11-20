import { UserRole } from './classroomUser.interface';

export interface JoinClass {
  class_id?: string;
  role: UserRole;
  code: string;
}
