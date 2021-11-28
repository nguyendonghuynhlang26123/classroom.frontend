import { Box, IconButton, LinearProgress, Link, Tab, Tabs, Typography } from '@mui/material';
import { ClassroomContextProvider, Navbar, ProfileBtn, useAuth, useLoading } from 'components';
import { drawerItemConfigs } from 'configs';
import React from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import {
  useGetClassDetailsQuery,
  useGetMyRoleQuery,
  useGetAllStudentsQuery,
  useUpdateClassMutation,
  useUploadStudentListMutation,
} from 'services/api';
import { mainSx, navSx } from './style';
import { ClassroomSetting } from './subcomponents';
import { Outlet, useLocation } from 'react-router';
import { matchPath } from 'react-router-dom';
import Utils from 'common/utils';
import { toast } from 'react-toastify';
import { IClassroomBody, IImportedStudents, UserRole } from 'common/interfaces';

const getTabState = (pathName: string) => {
  if (matchPath('/classroom/:id/people', pathName)) return 2;
  if (matchPath('/classroom/:id/work', pathName)) return 1;
  return 0;
};

const ClassroomBoard = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState<number>(getTabState(pathname));

  const { data, error, isLoading: fetchingClassData } = useGetClassDetailsQuery(id as string);
  const { data: role, isLoading: fetchingRole } = useGetMyRoleQuery(id as string);

  const [loading, setLoading] = useLoading();

  //Error
  React.useEffect(() => {
    if (error) {
      toast.error('Not found this class');
      navigate('/not-found');
    }
  }, [error]);

  React.useEffect(() => {
    setLoading(Utils.isLoading(fetchingRole, fetchingClassData));
  }, [fetchingClassData, fetchingRole]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <React.Fragment>
      <Navbar
        items={drawerItemConfigs}
        toolbarComponents={
          <>
            <Box sx={navSx.tabsContainer}>
              <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Stream" id="stream" onClick={() => navigate('.')} />
                <Tab label="Classwork" id="work" onClick={() => navigate('./work')} />
                <Tab label="People" id="people" onClick={() => navigate('./people')} />
                <Tab label="Grading" id="people" onClick={() => navigate('./grade')} />
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
          <ClassroomContextProvider role={role} classData={data}>
            <Outlet />
          </ClassroomContextProvider>
        </Box>
      )}
    </React.Fragment>
  );
};

export default ClassroomBoard;
