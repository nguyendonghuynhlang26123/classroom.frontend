import { IAssignmentBody } from 'common/interfaces';
export type AssignmentFormProps = {
  formData: IAssignmentBody;
  isLoading: boolean;
  handleChange: (property: string, value: any) => void;
  onSubmit: (form: IAssignmentBody) => void;
  onReset: () => void;
};
