import { Box, Container, LinearProgress, Link, Tab, Tabs, Typography } from '@mui/material';
import { Navbar, ProfileBtn, TabPanel, useAuth } from 'components';
import { drawerItemConfigs } from 'configs';
import React from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useGetClassDetailsQuery, useGetMyRoleQuery } from 'services/api';
import { mainSx, navSx } from './style';
import { ClassroomSetting, ClassworkTab, PeopleTab, StreamTab } from './subcomponents';
import Utils from 'common/utils';
import { toast } from 'react-toastify';

const ClassroomBoard = () => {
  const { id } = useParams();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState<number>(0);

  const { data, error, isLoading } = useGetClassDetailsQuery(id as string);
  const { data: role, error: roleError, isLoading: roleIsLoading } = useGetMyRoleQuery(id as string);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  //Error
  React.useEffect(() => {
    if (error) {
      const err = error as any;
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
                <Tab label="Stream" id="one" />
                <Tab label="Classwork" id="two" />
                <Tab label="People" id="three" />
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
          <TabPanel value={tabValue} index={0}>
            <StreamTab role={role} classData={data} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ClassworkTab />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <PeopleTab role={role} />
          </TabPanel>
        </Container>
      )}
    </React.Fragment>
  );
};

export default ClassroomBoard;
