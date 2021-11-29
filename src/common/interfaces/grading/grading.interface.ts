import { IBase } from './../base';
export interface IGradingAssignment extends IBase {
  assignment_id: string;
  class_id: string;
  student_id: string;
  mark?: number;
}

export interface IGradingBody {
  assignment_id: string;
  student_id: string;
  mark: number;
}
