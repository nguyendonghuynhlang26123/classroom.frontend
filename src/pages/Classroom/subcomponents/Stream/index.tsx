import { InfoOutlined, Info } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, IconButton, Stack, Collapse, Typography } from '@mui/material';
import { ROLE_STUDENT, ROLE_TEACHER } from 'common/constants';
import { Classroom } from 'common/interfaces/classes';
import React from 'react';
import { bannerSx } from './style';

const classData: Partial<Classroom> = {
  id: '123',
  title: '[CLC]PTUDWNC - 18KTPM1',
  section: 'WEB',
  subject: 'Advance Web',
  room: '123',
  image: 'https://www.gstatic.com/classroom/themes/img_breakfast.jpg',
  code: '4215ad',
};

let role = ROLE_TEACHER;

export const StreamTab = () => {
  const [details, showDetails] = React.useState<boolean>(false);

  const toggleShowDetails = () => {
    showDetails((prvState) => !prvState);
  };

  return (
    <Box minHeight="100vh">
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
            {role === ROLE_TEACHER && (
              <Stack direction="row" sx={bannerSx.expand_row}>
                <Typography variant="body2">Class code</Typography>
                <Typography variant="body2">{classData.code}</Typography>
              </Stack>
            )}
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
    </Box>
  );
};
