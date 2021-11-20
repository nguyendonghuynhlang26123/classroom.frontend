export interface Classroom {
  _id: string;
  title: string;
  section: string;
  subject: string;
  room: string;
  image: string;
  code: string;
}

export interface CreateClassroom {
  title: string;
  section: string;
  subject?: string;
  room?: string;
}
