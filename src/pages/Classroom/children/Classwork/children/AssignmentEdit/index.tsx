import React from 'react';
import { AssignmentForm } from 'components/AssignmentForm';
import { IAssignmentBody, UserRole } from 'common/interfaces';
import { useGetAllTopicsQuery, useGetAssignmentByIdQuery, useUpdateAssignmentMutation } from 'services';
import { Navigate, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Utils from 'common/utils';
import { useClassroomCtx } from 'components';

const defaultData: IAssignmentBody = {
  class_id: '',
  topic: undefined,
  title: '',
  instructions: '',
  grade_criterias: [],
  total_points: undefined,
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
  const { data: topics, isLoading: fetchingTopic } = useGetAllTopicsQuery(id as string);

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
      topics={topics || []}
      handleCreateTopic={() => {}}
      isLoading={Utils.isLoading(isLoading, isUpdating, fetchingTopic)}
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
