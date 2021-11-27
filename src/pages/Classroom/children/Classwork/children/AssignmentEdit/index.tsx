import React from 'react';
import { AssignmentForm } from 'components/AssignmentForm';
import { IAssignmentBody, UserRole } from 'common/interfaces';
import { useGetAssignmentByIdQuery, useUpdateAssignmentMutation } from 'services';
import { Navigate, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Utils from 'common/utils';
import { useClassroomCtx } from 'components';

const defaultData: IAssignmentBody = {
  class_id: '',
  title: '',
  instructions: '',
  total_points: 10,
  due_date: undefined,
};

const AssignmentEdit = () => {
  const { role } = useClassroomCtx();
  const { id, assignmentId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetAssignmentByIdQuery({
    classId: id as string,
    assignmentId: assignmentId as string,
  });
  const [formData, setFormData] = React.useState<IAssignmentBody>(defaultData);

  const [updateAssignment, { isLoading: isUpdating }] = useUpdateAssignmentMutation();

  React.useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleFormUpdate = (property: string, value: any) => {
    setFormData((prv) => ({
      ...prv,
      [property]: value,
    }));
  };

  const handleSubmit = (form: IAssignmentBody) => {
    updateAssignment({ id: id as string, assignmentId: assignmentId as string, body: form })
      .unwrap()
      .then(() => {
        toast.success('Update Assignment succeed!');
        navigate(`/classroom/${id}/work`);
      })
      .catch((err) => {
        toast.error('Update create assignment! ' + err.data);
      });
  };
  const handleReset = () => {
    setFormData(defaultData);
  };

  return role !== UserRole.STUDENT ? (
    <AssignmentForm
      isLoading={Utils.isLoading(isLoading, isUpdating)}
      formData={formData}
      handleChange={handleFormUpdate}
      onReset={handleReset}
      onSubmit={handleSubmit}
    />
  ) : (
    <Navigate to={'/classroom/' + id} />
  );
};

export default AssignmentEdit;
