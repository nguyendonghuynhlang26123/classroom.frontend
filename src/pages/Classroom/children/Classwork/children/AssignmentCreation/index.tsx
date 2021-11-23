import React from 'react';
import { AssignmentForm } from 'components/AssignmentForm';
import { IAssignmentBody, IAssignmentTopic } from 'common/interfaces';
import { useCreateAssignmentMutation, useCreateTopicMutation, useGetAllTopicsQuery } from 'services';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Utils from 'common/utils';

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
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<IAssignmentBody>(defaultData);
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();
  const { data: topics, isLoading: fetchingTopic } = useGetAllTopicsQuery(id as string);
  const [createTopic, { isLoading: isCreating }] = useCreateTopicMutation();

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
        navigate(-1);
      })
      .catch((err) => {
        toast.error('Cannot create assignment! ' + err.data);
      });
  };
  const handleReset = () => {
    setFormData(defaultData);
  };

  const handleCreateTopic = (topic: string) => {
    createTopic({
      id: id as string,
      body: {
        title: topic,
        class_id: id as string,
      },
    })
      .then((result: any) => {
        toast.success('Create Topic succeed!');
        setFormData((prev) => ({
          ...prev,
          topic: result?.data?._id,
        }));
      })
      .catch((err) => {
        toast.error('Cannot create assignment! ' + err.data);
      });
  };

  return (
    <div>
      <AssignmentForm
        topics={topics || []}
        handleCreateTopic={handleCreateTopic}
        isLoading={Utils.isLoading(isLoading, fetchingTopic)}
        formData={formData}
        handleChange={handleFormUpdate}
        onReset={handleReset}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AssignmentCreate;
