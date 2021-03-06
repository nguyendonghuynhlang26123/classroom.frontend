import { IAssignment, IGradingAssignment } from 'common/interfaces';
import { IUser } from '../users/users.interface';
import { IBase } from '../base';

export interface IGradeReview extends IBase {
  student_account: IUser | string;
  assignment_id: string | IAssignment;
  grading_id: string | IGradingAssignment;
  expect_mark: number;
  current_mark: number;
  status: RequestReviewStatus;
  comments: IGradeReviewComment[];
}

export interface IGradeReviewComment {
  author: null | IUser | string;
  message: string;
  created_at: number;
}

export enum RequestReviewStatus {
  OPEN = 'OPEN',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}
