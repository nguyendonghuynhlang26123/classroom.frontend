import React from 'react';
import { activatePageSx } from './style';
import { Container, Grow, Paper, Typography, Box, Button, Divider, Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import Email from 'assets/images/sending-mail.svg';

const EmailActivate = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [processing, setProcessing] = React.useState(true);

  React.useEffect(() => {
    if (search) {
      const params = new URLSearchParams(search);
      const code = params.get('code') as string;
    } else setProcessing(false);
  }, [search]);

  return (
    <Box sx={activatePageSx.root}>
      <Grow appear={true} in={true} timeout={500}>
        <Container sx={activatePageSx.container}>
          <Paper elevation={0} square sx={activatePageSx.paper}>
            <Box sx={activatePageSx.imgContainer}>
              <img alt="Email verification" src={Email} />
            </Box>
            <Divider />
            {processing ? (
              <>
                <Typography variant="h6" sx={activatePageSx.paper_title}>
                  Please wait a few moment...
                </Typography>
                <Typography variant="body2">Your request is in progress</Typography>
              </>
            ) : (
              <>
                <Typography variant="h6" sx={activatePageSx.paper_title}>
                  Your account is not yet activated
                </Typography>
                <Typography variant="body2">An activation link has been sent to your email! Please check your registered email!</Typography>
              </>
            )}
          </Paper>
        </Container>
      </Grow>
    </Box>
  );
};

export default EmailActivate;
