import { Box, Typography, LinearProgress } from '@mui/material';
import React from 'react';
import { Navbar, ProfileBtn, useAuth } from 'components';
import { drawerItemConfigs } from 'configs';
import { AddBtn, ClassCard } from './subcomponents';
import { bodyContainer, cardContainer } from './style';
import type { CreateClassroom } from 'common/interfaces';
import Utils from 'common/utils';
import { useNavigate } from 'react-router';
import { Classroom, UserRole } from 'common/interfaces';
import { useAppDispatch } from 'store/hooks';
import { showMessage, showSuccessMessage } from 'store/slices';
import { useCreateClassMutation, useGetAllClassesQuery, useJoinClassMutation } from 'services/api';

const Dashboard = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData } = useAuth();
  const { data, error, isLoading } = useGetAllClassesQuery();
  const [createClass, { isLoading: isUpdating }] = useCreateClassMutation();
  const [joinClass, { isLoading: isJoining }] = useJoinClassMutation();

  const handleCreateClass = (form: CreateClassroom) => {
    createClass(form);
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
            {data.map((c: Classroom, index: number) => (
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
