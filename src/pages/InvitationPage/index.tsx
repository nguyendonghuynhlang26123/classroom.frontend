import { LinearProgress } from '@mui/material';
import { UserRole } from 'common/interfaces';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { showMessage } from 'store/slices';
import InvitationService from './service';

const InvitePage = () => {
  const dispatch = useAppDispatch();
  const service = new InvitationService();
  const { search } = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (search) {
      const params = new URLSearchParams(search);
      const classId = params.get('classId') as string;
      const role = params.get('role') as UserRole;
      const code = params.get('code') as string;
      service
        .joinClassroom(classId, code, role)
        .then((data) => {
          navigate('/classroom/' + classId);
        })
        .catch((err) => {
          if (err.statusCode === 409) {
            dispatch(
              showMessage({
                message:
                  'Invited email and your account email is not the same! Please login with the Email you received the invitation code',
                type: 'error',
              }),
            );
          }

          // navigate('/not-found');
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
