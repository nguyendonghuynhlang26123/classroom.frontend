import React from 'react';
import { LinearProgress } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Utils from 'common/utils';
import { UserRole } from 'common/interfaces';
import InvitationService from './service';

const InvitePage = () => {
  const service = new InvitationService();
  const { search } = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (search) {
      console.log('log ~ file: index.tsx ~ line 14 ~ React.useEffect ~ search', search);
      const params = new URLSearchParams(search);
      const classId = params.get('classId') as string;
      const role = params.get('role') as string;
      const code = params.get('code') as UserRole;
      service.joinClassroom(classId, role, code).then((data) => {
        navigate('/classroom/' + classId);
      });
    } else navigate('/');
  }, []);

  return <LinearProgress />;
};

export default InvitePage;
