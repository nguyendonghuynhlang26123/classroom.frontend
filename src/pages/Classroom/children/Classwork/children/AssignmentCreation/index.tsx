import React from 'react';
import { AssignmentForm } from 'components/AssignmentForm';
import { IAssignmentBody } from 'common/interfaces';

const defaultData: IAssignmentBody = {
  class_id: '',
  topic: undefined,
  title: '',
  instructions: '',
  grade_criterias: [],
  total_points: undefined,
  due_date: undefined,
};

const AssignmentCreate = () => {
  const [formData, setFormData] = React.useState<IAssignmentBody>(defaultData);

  const handleFormUpdate = (property: string, value: any) => {
    setFormData((prv) => ({
      ...prv,
      [property]: value,
    }));
  };

  const handleSubmit = (form: IAssignmentBody) => {};
  const handleReset = () => {
    setFormData(defaultData);
  };

  return (
    <div>
      <AssignmentForm
        formData={formData}
        handleChange={handleFormUpdate}
        onReset={handleReset}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AssignmentCreate;
