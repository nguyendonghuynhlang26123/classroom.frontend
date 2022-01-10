import { LinearProgress } from '@mui/material';
import { UserRole } from 'common/interfaces';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAcceptInvitationMutation } from 'services/api';

const InvitePage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [acceptInvitationSubmit, { error }] = useAcceptInvitationMutation();

  React.useEffect(() => {
    if (search) {
      const params = new URLSearchParams(search);
      const classId = params.get('classId') as string;
      const role = params.get('role') as UserRole;
      const code = params.get('code') as string;
      acceptInvitationSubmit({
        class_id: classId,
        code,
        role,
      })
        .unwrap()
        .then(() => {
          toast.success('Operation suceeed! You are registered in this class!');
          navigate('/classroom/' + classId);
        })
        .catch((error) => {
          const err = error as any;
          if (err.status === 409) {
            toast.warn(
              'Cannot join this class via this invitation link! Please check your email again to match the email that received the invitation link ',
            );
          } else toast.warn('Cannot join process this invitation link! ' + err.data);
          navigate('/not-found');
        });
    } else navigate('/');
  }, []);

  return (
    <>
      <LinearProgress />; Please wait a few moment
    </>
  );
};

export default InvitePage;
