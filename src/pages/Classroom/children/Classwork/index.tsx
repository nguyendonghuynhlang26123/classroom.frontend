import { Collapse } from '@mui/material';
import { UserRole } from 'common/interfaces';
import { useClassroomCtx } from 'components';
import { EditableGradeStructure, GradeStructure } from './subcomponents';
import React from 'react';

const ClassroomWork = () => {
  const { role } = useClassroomCtx();

  return (
    <Collapse timeout={500} appear={true} in={true}>
      {role === UserRole.STUDENT ? <GradeStructure /> : <EditableGradeStructure />}
    </Collapse>
  );
};

export default ClassroomWork;
