import { LinearProgress } from '@mui/material';
import { UserRole } from 'common/interfaces';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAcceptInvitationMutation } from 'services/api';
import { useAppDispatch } from 'store/hooks';
import { toast } from 'react-toastify';

const InvitePage = () => {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [acceptInvitationSubmit, { data, isSuccess, error }] = useAcceptInvitationMutation();

  React.useEffect(() => {
    navigate('/classroom/' + data._id);
  }, [isSuccess]);

  React.useEffect(() => {
    const err = error as any;
    if (err.status === 409) {
      toast.warn(
        'Cannot join process this invitation link! Please check your email again to match the email that received the invitation link ',
      );
    }
  }, [error]);

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
