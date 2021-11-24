import { IGradeCriteria } from './../../common/interfaces/assignments/assignments.interface';
import { IAssignmentBody, IAssignmentTopic } from 'common/interfaces';
export type AssignmentFormProps = {
  formData: IAssignmentBody;
  topics: IAssignmentTopic[];
  isLoading: boolean;
  handleCreateTopic: (title: string) => void;
  handleChange: (property: string, value: any) => void;
  onSubmit: (form: IAssignmentBody) => void;
  onReset: () => void;
};

export type GradeStructureProps = {
  criterias: IGradeCriteria[];
  handleChange: (criterias: IGradeCriteria[]) => void;
};

export type CriteriaCardProps = {
  criteria: IGradeCriteria;
  index: number;
  onRemove: () => void;
  onMoveOnTop: () => void;
  onMoveOnBottom: () => void;
  handleChange: (property: string, value: any) => void;
};
