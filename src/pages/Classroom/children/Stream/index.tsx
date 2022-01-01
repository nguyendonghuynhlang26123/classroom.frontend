import { Info, InfoOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Collapse, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { UserRole } from 'common/interfaces';
import { useClassroomCtx } from 'components';
import React from 'react';
import { activitySx, bannerSx } from './style';
import { ClassCodePanel, ClassActivities } from './subcomponents';

const ClassroomStream = () => {
  const { classData, role } = useClassroomCtx();
  const [details, showDetails] = React.useState<boolean>(false);

  const toggleShowDetails = () => {
    showDetails((prvState) => !prvState);
  };

  return (
    <Collapse timeout={500} appear={true} in={true}>
      {classData && role && (
        <Container>
          {/* BANNER */}
          <Card sx={bannerSx.card} elevation={details ? 4 : 0}>
            <CardMedia component="img" height="240" image={classData.image} alt="bg" />
            <Stack spacing={2} direction="row" sx={bannerSx.card_stack}>
              <Box sx={bannerSx.header}>
                <Box sx={bannerSx.header_title}>{classData.title}</Box>
                <Box sx={bannerSx.header_section}>{classData.section}</Box>
              </Box>

              <IconButton onClick={toggleShowDetails}>{details ? <Info /> : <InfoOutlined />}</IconButton>
            </Stack>

            <Collapse in={details}>
              <CardContent sx={bannerSx.content}>
                {classData?.subject && (
                  <Stack direction="row" sx={bannerSx.expand_row}>
                    <Typography variant="body2">Subject</Typography>
                    <Typography variant="body2">{classData.subject}</Typography>
                  </Stack>
                )}
                {classData?.room && (
                  <Stack direction="row" sx={bannerSx.expand_row}>
                    <Typography variant="body2">Room</Typography>
                    <Typography variant="body2">{classData.room}</Typography>
                  </Stack>
                )}
              </CardContent>
            </Collapse>
          </Card>
          {role !== UserRole.STUDENT ? (
            <Grid container spacing={2} sx={activitySx.root}>
              <Grid item xs={2}>
                <ClassCodePanel code={classData.code} />
              </Grid>
              <Grid item xs={10}>
                <ClassActivities />
              </Grid>
            </Grid>
          ) : (
            <ClassActivities />
          )}
        </Container>
      )}
    </Collapse>
  );
};

export default ClassroomStream;
