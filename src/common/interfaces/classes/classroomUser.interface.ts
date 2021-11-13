export interface ClassroomUser {
  userId: string;
  status: 'ACTIVATED' | 'INACTIVATED';
  role: 'TEACHER' | 'STUDENT';
  invite_code: string;
}
