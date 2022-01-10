import { UserRole } from 'common/interfaces';
import { ClassroomTab, useClassroomCtx } from 'components';
import React from 'react';
import { EditableGradeStructure, GradeStructure } from './subcomponents';

const ClassroomWork = () => {
  const { role } = useClassroomCtx();

  return (
    <ClassroomTab roles={[UserRole.TEACHER, UserRole.STUDENT, UserRole.OWNER]}>
      {role === UserRole.STUDENT ? <GradeStructure /> : <EditableGradeStructure />}
    </ClassroomTab>
  );
};

export default ClassroomWork;
