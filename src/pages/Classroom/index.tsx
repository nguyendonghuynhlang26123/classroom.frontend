import { Box, Container, LinearProgress, Link, Tab, Tabs, Typography } from '@mui/material';
import { ClassroomContextProvider, Navbar, ProfileBtn, useAuth } from 'components';
import { drawerItemConfigs } from 'configs';
import React from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useGetClassDetailsQuery, useGetMyRoleQuery } from 'services/api';
import { mainSx, navSx } from './style';
import { ClassroomSetting } from './subcomponents';
import { Outlet, useLocation } from 'react-router';
import { matchPath } from 'react-router-dom';

import Utils from 'common/utils';
import { toast } from 'react-toastify';

const getTabState = (pathName: string) => {
  if (matchPath(pathName, '/classroom/:id/people')) return 2;
  if (matchPath(pathName, '/classroom/:id/work')) return 1;
  return 0;
};

const ClassroomBoard = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState<number>(getTabState(pathname));

  const { data, error, isLoading } = useGetClassDetailsQuery(id as string);
  const { data: role, isLoading: roleIsLoading } = useGetMyRoleQuery(id as string);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  //Error
  React.useEffect(() => {
    if (error) {
      toast.error('Not found this class');
      navigate('/not-found');
    }
  }, [error]);

  return (
    <React.Fragment>
      <Navbar
        items={drawerItemConfigs}
        toolbarComponents={
          <>
            <Box sx={navSx.tabsContainer}>
              <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Stream" id="one" onClick={() => navigate('.')} />
                <Tab label="Classwork" id="two" onClick={() => navigate('./work')} />
                <Tab label="People" id="three" onClick={() => navigate('./people')} />
              </Tabs>
            </Box>
            {Utils.isLoading(isLoading, roleIsLoading) && <LinearProgress sx={navSx.progressBar} />}
          </>
        }
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link underline="hover" sx={navSx.link}>
            {data && data.title}
          </Link>
        </Typography>

        <Box>
          <ClassroomSetting />
          {userData && <ProfileBtn fname={userData.first_name} imageUrl={userData.avatar} />}
        </Box>
      </Navbar>
      {!isLoading && data && role && (
        <Container maxWidth={false} sx={mainSx.container}>
          <ClassroomContextProvider role={role} classData={data}>
            <Outlet />
          </ClassroomContextProvider>
        </Container>
      )}
    </React.Fragment>
  );
};

export default ClassroomBoard;
