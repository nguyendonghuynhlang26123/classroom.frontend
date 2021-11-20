import { User } from './../users/users.interface';
export interface IClassroomUser {
  user_id: User;
  status: 'ACTIVATED' | 'INACTIVATED';
  role: UserRole;
  invite_code?: string;
}

export enum UserRole {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
}
