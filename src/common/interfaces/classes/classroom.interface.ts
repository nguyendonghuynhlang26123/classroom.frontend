import { ClassroomUser } from './classroomUser.interface';

export interface Classroom {
  _id: string;
  title: string;
  section: string;
  subject: string;
  room: string;
  image: string;
  code: string;
}
