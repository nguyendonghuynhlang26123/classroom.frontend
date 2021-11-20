export interface IClassroom {
  _id: string;
  title: string;
  section: string;
  subject: string;
  room: string;
  image: string;
  code: string;
}

export interface IClassroomBody {
  title: string;
  section: string;
  subject?: string;
  room?: string;
}
