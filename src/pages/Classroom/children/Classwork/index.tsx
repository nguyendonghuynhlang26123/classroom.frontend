import React from 'react';
import { TabPanel, useClassroomCtx } from 'components';
import { Collapse } from '@mui/material';

const ClassroomWork = () => {
  const { role } = useClassroomCtx();
  return (
    <Collapse timeout={500} appear={true} in={true}>
      Classwork Tab
    </Collapse>
  );
};

export default ClassroomWork;
