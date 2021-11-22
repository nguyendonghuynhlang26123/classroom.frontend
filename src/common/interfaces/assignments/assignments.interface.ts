import { IAssignmentTopic } from './../topics/topic.interface';
import { IBase } from '../base';
export interface IGradeCriteria {
  name: string;
  points: string;
}

export interface IAssignment extends IBase {
  class_id: string;
  topic: IAssignmentTopic;
  title: string;
  instructions: string;
  grade_criterias: IGradeCriteria[];
  total_points: number;
  due_date: number;
}

export interface IAssignmentBody {
  class_id: string;
  topic?: IAssignmentTopic;
  title: string;
  instructions: string;
  grade_criterias: IGradeCriteria[];
  total_points?: number;
  due_date?: number;
}
