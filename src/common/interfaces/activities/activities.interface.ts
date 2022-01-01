import { IBase } from './../base';
import { IUser } from '../users';

export interface IActivity extends IBase {
  class_id: string;
  type: ActivityType;
  description: string;
  actor: IUser;
  assignment_id?: string;
}

export enum ActivityType {
  ASSIGNMENT_ADD = 'ASSIGNMENT_ADD',
  CLASSROOM_INFO_UPDATE = 'CLASSROOM_INFO_UPDATE',
  TEACHER_JOIN = 'TEACHER_JOIN',
  GRADING_FINALIZED = 'GRADING_FINALIZED',
  OTHER = 'OTHER',
}
