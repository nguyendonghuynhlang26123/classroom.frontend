import { UserRole } from './classroomUser.interface';
export interface InviteUser {
  class_id: string;
  email: string;
  role: UserRole;
}
