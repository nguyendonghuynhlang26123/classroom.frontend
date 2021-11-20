import { Box, LinearProgress, Typography } from '@mui/material';
import type { IClassroomBody } from 'common/interfaces';
import { IClassroom, UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { Navbar, ProfileBtn, useAuth } from 'components';
import { drawerItemConfigs } from 'configs';
import React from 'react';
import { useNavigate } from 'react-router';
import { useCreateClassMutation, useGetAllClassesQuery, useJoinClassMutation } from 'services/api';
import { useAppDispatch } from 'store/hooks';
import { bodyContainer, cardContainer } from './style';
import { AddBtn, ClassCard } from './subcomponents';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { data, error, isLoading } = useGetAllClassesQuery();
  const [createClass, { isLoading: isUpdating }] = useCreateClassMutation();
  const [joinClass, { isLoading: isJoining }] = useJoinClassMutation();

  const handleCreateClass = (form: IClassroomBody) => {
    createClass(form)
      .unwrap()
      .then(() => {
        toast.success('Successfully creating a class');
      })
      .catch((err) => {
        toast.error('Failed to create a class');
      });
  };

  const handleJoinClass = (form: { code: string }) => {
    joinClass({ code: form.code, role: UserRole.STUDENT });
  };

  return (
    <React.Fragment>
      <Navbar
        items={drawerItemConfigs}
        toolbarComponents={<>{Utils.isLoading(isLoading, isUpdating, isJoining) && <LinearProgress />}</>}
      >
        <>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🎓 Moorssalc
          </Typography>

          <div>
            <AddBtn handleCreateClass={handleCreateClass} handleJoinClass={handleJoinClass} />
            {userData && <ProfileBtn fname={userData.first_name} imageUrl={userData.avatar} />}
          </div>
        </>
      </Navbar>
      {!isLoading && data && (
        <Box sx={bodyContainer}>
          <Box sx={cardContainer}>
            {data.map((c: IClassroom, index: number) => (
              <ClassCard
                key={index}
                title={c.title}
                section={c.section}
                image={c.image}
                onClick={() => {
                  navigate(`/classroom/${c._id}`);
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
