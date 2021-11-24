import { IBase } from '../base';
export interface IGradeCriteria {
  name: string;
  points: string;
}

export interface IAssignment extends IBase {
  class_id: string;
  topic: string;
  title: string;
  instructions: string;
  grade_criterias: IGradeCriteria[];
  total_points: number;
  due_date: number;
}

export interface IAssignmentBody {
  class_id: string;
  topic?: string;
  title: string;
  instructions: string;
  grade_criterias: IGradeCriteria[];
  total_points?: number;
  due_date?: number;
}
