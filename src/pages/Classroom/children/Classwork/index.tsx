import { Collapse } from '@mui/material';
import { UserRole } from 'common/interfaces';
import { useClassroomCtx } from 'components';
import { EditableGradeStructure, GradeStructure } from './subcomponents';
import React from 'react';

const ClassroomWork = () => {
  const { role } = useClassroomCtx();

  return role === UserRole.STUDENT ? <GradeStructure /> : <EditableGradeStructure />;
};

export default ClassroomWork;
