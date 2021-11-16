import React from 'react';
import { Classroom } from 'common/interfaces';
import { Navbar, ProfileBtn, TabPanel, useAuth } from 'components';
import { drawerItemConfigs } from 'configs';
import { Box, Typography, Tab, Tabs, LinearProgress, Link, Container } from '@mui/material';
import { ClassroomSetting, ClassworkTab, PeopleTab, StreamTab } from './subcomponents';
import { navSx, mainSx } from './style';
import { useParams } from 'react-router-dom';
import ClassroomService from './service';

const ClassroomBoard = () => {
  const { id } = useParams();
  console.log('log ~ file: index.tsx ~ line 13 ~ ClassroomBoard ~ id', id);
  const classService = new ClassroomService();
  const { userData } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [tabValue, setTabValue] = React.useState<number>(0);
  const [classData, setClassData] = React.useState<Classroom | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  React.useEffect(() => {
    if (id)
      classService.getOne(id).then((data: Classroom) => {
        setClassData(data);
        setLoading(false);
      });
  }, []);

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
            {loading && <LinearProgress sx={navSx.progressBar} />}
          </>
        }
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link underline="hover" href={'/'} sx={navSx.link}>
            {classData && classData.title}
          </Link>
        </Typography>

        <Box>
          <ClassroomSetting />
          {userData && <ProfileBtn fname={userData.first_name} imageUrl={userData.avatar} />}
        </Box>
      </Navbar>
      {!loading && (
        <Container maxWidth={false} sx={mainSx.container}>
          {classData && (
            <TabPanel value={tabValue} index={0}>
              <StreamTab classData={classData} />
            </TabPanel>
          )}
          <TabPanel value={tabValue} index={1}>
            <ClassworkTab />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <PeopleTab />
          </TabPanel>
        </Container>
      )}
    </React.Fragment>
  );
};

export default ClassroomBoard;
