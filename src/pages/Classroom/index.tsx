import { Box, IconButton, LinearProgress, Link, Tab, Tabs, Typography } from '@mui/material';
import { ClassroomContextProvider, ConfirmDialog, Navbar, ProfileBtn, useAuth, useLoading } from 'components';
import React from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useGetClassDetailsQuery, useGetMyRoleQuery, useGetMyStudentIdQuery, useGetAllClassesQuery } from 'services/api';
import { mainSx, navSx } from './style';
import { ClassroomSetting } from './subcomponents';
import { Outlet, useLocation } from 'react-router';
import { matchPath } from 'react-router-dom';
import Utils from 'common/utils';
import { toast } from 'react-toastify';
import { IClassroomBody, UserRole } from 'common/interfaces';

const getTabState = (pathName: string) => {
  if (matchPath('/classroom/:id/work', pathName)) return 1;
  if (matchPath('/classroom/:id/people', pathName)) return 2;
  if (matchPath('/classroom/:id/grade', pathName)) return 3;
  return 0;
};

const ClassroomBoard = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState<number>(getTabState(pathname));
  const [notifyMappingStudentId, showNotification] = React.useState<boolean>(false);

  const { data, error, isLoading: fetchingClassData } = useGetClassDetailsQuery(id as string);
  const { data: classrooms, isLoading: isFetchingClassrooms } = useGetAllClassesQuery();
  const { data: role, isLoading: fetchingRole } = useGetMyRoleQuery(id as string);
  const {
    data: studentData,
    error: stuErr,
    isLoading: fetchingStuId,
  } = useGetMyStudentIdQuery(
    {
      classId: id as string,
      userId: userData?._id as string,
    },
    { skip: !Boolean(role) || role !== UserRole.STUDENT },
  );

  const [loading, setLoading] = useLoading();

  //Error
  React.useEffect(() => {
    if (error) {
      toast.error('Not found this class');
      navigate('/not-found');
    }
  }, [error]);

  React.useEffect(() => {
    setLoading(Utils.isLoading(fetchingRole, fetchingClassData, fetchingStuId, isFetchingClassrooms));
  }, [fetchingClassData, fetchingRole, fetchingStuId, isFetchingClassrooms]);

  React.useEffect(() => {
    const err = stuErr as any;
    if (err && err?.status === 404) {
      showNotification(true);
    }
  }, [stuErr]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <React.Fragment>
      <Navbar
        classrooms={classrooms || []}
        toolbarComponents={
          <>
            <Box sx={navSx.tabsContainer}>
              <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Stream" id="stream" onClick={() => navigate('.')} />
                <Tab label="Classwork" id="work" onClick={() => navigate('./work')} />
                <Tab label="People" id="people" onClick={() => navigate('./people')} />
                {role !== UserRole.STUDENT && <Tab label="Grading" id="people" onClick={() => navigate('./grade')} />}
              </Tabs>
            </Box>
            {loading && <LinearProgress sx={navSx.progressBar} />}
          </>
        }
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link underline="hover" sx={navSx.link}>
            {data && data.title}
          </Link>
        </Typography>

        <Box>
          {role !== UserRole.STUDENT && <ClassroomSetting classData={data as IClassroomBody} />}
          {userData && <ProfileBtn fname={userData.first_name} imageUrl={userData.avatar} />}
        </Box>
      </Navbar>
      {data && role && (
        <Box sx={mainSx.container}>
          <ClassroomContextProvider role={role} classData={data} studentId={studentData ? studentData.student_id : null}>
            <Outlet />
          </ClassroomContextProvider>
        </Box>
      )}
      {role === UserRole.STUDENT && (
        <ConfirmDialog
          open={notifyMappingStudentId}
          handleClose={() => {
            showNotification(false);
          }}
          title="Reminder"
          description="You need link your current account with your student account in this class"
          onConfirm={() => {
            navigate(`/classroom/${id}/people`);
            showNotification(false);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ClassroomBoard;
