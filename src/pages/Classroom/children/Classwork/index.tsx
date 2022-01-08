import { Collapse } from '@mui/material';
import { UserRole } from 'common/interfaces';
import { ClassroomTab, useClassroomCtx } from 'components';
import { EditableGradeStructure, GradeStructure } from './subcomponents';
import React from 'react';

const ClassroomWork = () => {
  const { role } = useClassroomCtx();

  return (
    <ClassroomTab roles={[UserRole.TEACHER, UserRole.STUDENT, UserRole.OWNER]}>
      {role === UserRole.STUDENT ? <GradeStructure /> : <EditableGradeStructure />}
    </ClassroomTab>
  );
};

export default ClassroomWork;
