import { ClassroomUser } from './classroomUser.interface';

export interface Classroom {
  id: string;
  title: string;
  name: string;
  section: string;
  subject: string;
  room: string;
  image: string;
  code: string;
  users: ClassroomUser[];
}
