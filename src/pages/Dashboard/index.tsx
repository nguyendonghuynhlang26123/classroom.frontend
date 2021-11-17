import { Box, Typography, LinearProgress } from '@mui/material';
import React from 'react';
import { Navbar, ProfileBtn, useAuth } from 'components';
import { drawerItemConfigs } from 'configs';
import { AddBtn, ClassCard } from './subcomponents';
import { bodyContainer, cardContainer } from './style';
import { FormData } from './type';
import ClassroomService from './service';
// import { useAppDispatch, useAppSelector } from 'store/hooks';
import { GenericGetAllResponse } from 'common/interfaces/response/generic.interface';
import { useNavigate } from 'react-router';
import { Classroom, UserRole } from 'common/interfaces';
import { useAppDispatch } from 'store/hooks';
import { showMessage } from 'store/slices';

const service = new ClassroomService();

const Dashboard = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [classes, setClasses] = React.useState<Classroom[]>([]); //TODO: REPLACE USING REDUX

  React.useEffect(() => {
    setLoading(true);
    service.getClassList().then((response: GenericGetAllResponse<Classroom>) => {
      setClasses(response?.data);
      setLoading(false);
    });
  }, []);

  const handleCreateClass = (form: FormData) => {
    setLoading(true);
    service.create(form).then((d) => {
      d;
      setLoading(false);
      setClasses((prv) => [...prv, d]);
    });
  };

  const handleJoinClass = (form: { code: string }) => {
    setLoading(true);
    service
      .joinClassRoom({ code: form.code, role: UserRole.STUDENT })
      .then((d) => {
        d;
        setLoading(false);
        dispatch(showMessage({ message: 'Class enrolled with code = ' + form.code + '!' }));
      })
      .catch((err) => {
        dispatch(showMessage({ message: 'Failed to enroll!', type: 'error' }));
      });
  };

  return (
    <React.Fragment>
      <Navbar items={drawerItemConfigs} toolbarComponents={<>{loading && <LinearProgress />}</>}>
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
      {!loading && (
        <Box sx={bodyContainer}>
          <Box sx={cardContainer}>
            {classes.map((c: Classroom, index: number) => (
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
