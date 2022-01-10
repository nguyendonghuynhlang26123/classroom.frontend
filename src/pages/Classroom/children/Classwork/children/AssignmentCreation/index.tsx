import { IAssignmentBody, UserRole } from 'common/interfaces';
import { useClassroomCtx } from 'components';
import { AssignmentForm } from 'components/AssignmentForm';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateAssignmentMutation } from 'services';

const defaultData: IAssignmentBody = {
  class_id: '',
  title: '',
  instructions: '',
  total_points: 10,
  due_date: undefined,
};

const AssignmentCreate = () => {
  const { id } = useParams<'id'>();
  const { role } = useClassroomCtx();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<IAssignmentBody>(defaultData);
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();

  const handleFormUpdate = (property: string, value: any) => {
    setFormData((prv) => ({
      ...prv,
      [property]: value,
    }));
  };

  const handleSubmit = (form: IAssignmentBody) => {
    console.log('log ~ file: index.tsx ~ line 32 ~ handleSubmit ~ form', form);
    createAssignment({ id: id as string, body: form })
      .unwrap()
      .then(() => {
        toast.success('Create Assignment succeed!');
        navigate(`/classroom/${id}/work`);
      })
      .catch((err) => {
        toast.error('Cannot create assignment! ' + err.data);
      });
  };
  const handleReset = () => {
    setFormData(defaultData);
  };

  return role !== UserRole.STUDENT ? (
    <AssignmentForm
      isLoading={isLoading}
      formData={formData}
      handleChange={handleFormUpdate}
      onReset={handleReset}
      onSubmit={handleSubmit}
    />
  ) : (
    <Navigate to={'/classroom/' + id} />
  );
};

export default AssignmentCreate;
