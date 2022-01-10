import React from 'react';
import { banPageSx } from './style';
import { Container, Grow, Paper, Typography, Box, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router';

const BannedPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={banPageSx.root}>
      <Grow appear={true} in={true} timeout={500}>
        <Container sx={banPageSx.container}>
          <Paper elevation={0} square sx={banPageSx.paper}>
            <Typography variant="h1">😭</Typography>
            <Typography variant="h5" sx={banPageSx.paper_title}>
              This account has been blocked from using the app
            </Typography>
            <Divider />
            <Typography variant="body1">Please contact admin for further support</Typography>
            <Button onClick={() => navigate('/auth/login')}>Back to login</Button>
          </Paper>
        </Container>
      </Grow>
    </Box>
  );
};

export default BannedPage;
