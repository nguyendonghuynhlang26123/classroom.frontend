import { Box, LinearProgress, Typography } from '@mui/material';
import type { IClassroomBody } from 'common/interfaces';
import { IClassroom, UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { Navbar, ProfileBtn, useAuth, useLoading } from 'components';
import React from 'react';
import { useNavigate } from 'react-router';
import { useCreateClassMutation, useGetAllClassesQuery, useJoinClassMutation } from 'services/api';
import { bodyContainer, cardContainer } from './style';
import { AddBtn, ClassCard } from './subcomponents';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { data: classrooms, isLoading: isFetchingClassrooms } = useGetAllClassesQuery();
  const [createClass, { isLoading: isUpdating }] = useCreateClassMutation();
  const [joinClass, { isLoading: isJoining }] = useJoinClassMutation();
  const [loading, setLoading] = useLoading();

  React.useEffect(() => {
    setLoading(Utils.isLoading(isFetchingClassrooms, isUpdating, isJoining));
  }, [isFetchingClassrooms, isUpdating, isJoining]);

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
      <Navbar classrooms={classrooms || []} toolbarComponents={<>{loading && <LinearProgress />}</>}>
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
      {!loading && classrooms && (
        <Box sx={bodyContainer}>
          <Box sx={cardContainer}>
            {classrooms.map((c: IClassroom, index: number) => (
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
