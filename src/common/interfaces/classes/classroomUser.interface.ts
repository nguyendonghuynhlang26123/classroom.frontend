import { User } from './../users/users.interface';
export interface ClassroomUser {
  user: User;
  status: 'ACTIVATED' | 'INACTIVATED';
  role: UserRole;
  invite_code?: string;
}

export enum UserRole {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
}
