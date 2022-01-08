import { IUser, IAssignment, IGradingAssignment } from 'common/interfaces';
import { IBase } from './../base';
export interface INotification extends IBase {
  class_id: string;
  for: string[];
  type: 'GRADE_REVIEW_UPDATE' | 'GRADE_FINALIZE';
  description: string;
  actor_id: IUser;
  assignment: IAssignment;
  grading?: IGradingAssignment;
}
