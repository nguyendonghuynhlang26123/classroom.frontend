import React from 'react';

import { Navbar, ProfileBtn } from 'components';
import { drawerItemConfigs } from 'configs';
import { Box, Typography, Tab, Tabs, LinearProgress, Link } from '@mui/material';
import { navSx } from './style';

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
                <Tab label="Item One" id="one" />
                <Tab label="Item Two" id="two" />
                <Tab label="Item Three" id="three" />
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
    </React.Fragment>
  );
};

export default ClassroomBoard;
