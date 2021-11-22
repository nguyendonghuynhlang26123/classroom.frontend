import { IBase } from './../base';
export interface IClassroom {
  title: string;
  section: string;
  subject: string;
  room: string;
  image: string;
  code: string;
}

export interface IClassroomBody extends IBase {
  title: string;
  section: string;
  subject?: string;
  room?: string;
}
