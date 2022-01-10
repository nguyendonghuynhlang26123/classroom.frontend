import { Collapse } from '@mui/material';
import { UserRole } from 'common/interfaces';
import { useClassroomCtx } from 'components';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type RoleGuardType = {
  roles: UserRole[];
  navigateTo?: (urlParams: any) => string;
  children: any;
};

export const ClassroomTab = ({ roles, navigateTo, children }: RoleGuardType) => {
  const params = useParams();
  const navigate = useNavigate();
  const { role } = useClassroomCtx();
  React.useEffect(() => {
    const existed = roles.find((r) => r === role);
    if (!existed) {
      if (navigateTo) navigate(navigateTo(params));
      navigate('/not-found');
    }
  }, [role]);
  return (
    <Collapse timeout={500} appear={true} in={true} className="tab-wrap">
      {children}
    </Collapse>
  );
};
