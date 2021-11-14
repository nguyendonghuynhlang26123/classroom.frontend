import React from 'react';

import { Navbar, ProfileBtn, TabPanel } from 'components';
import { drawerItemConfigs } from 'configs';
import { Box, Typography, Tab, Tabs, LinearProgress, Link, Container } from '@mui/material';
import { navSx, mainSx } from './style';
import { ClassworkTab, PeopleTab, StreamTab } from './Tabs';

const ClassroomBoard = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tabValue, setTabValue] = React.useState<number>(0);

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
            [CLC]PTUDWNC - 18KTPM1
          </Link>
        </Typography>

        <Box>
          <ProfileBtn />
        </Box>
      </Navbar>
      <Container maxWidth={false} sx={mainSx.container}>
        <TabPanel value={tabValue} index={0}>
          <StreamTab />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ClassworkTab />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <PeopleTab />
        </TabPanel>
      </Container>
    </React.Fragment>
  );
};

export default ClassroomBoard;
