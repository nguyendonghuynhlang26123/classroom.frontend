import { InfoOutlined, Info } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, IconButton, Stack, Collapse } from '@mui/material';
import React from 'react';
import { bannerSx } from './style';

export const StreamTab = () => {
  const [details, showDetails] = React.useState<boolean>(false);

  const toggleShowDetails = () => {
    showDetails((prvState) => !prvState);
  };

  return (
    <Box minHeight="100vh">
      {/* BANNER */}
      <Card sx={bannerSx.card} elevation={details ? 4 : 0}>
        <CardMedia
          component="img"
          height="240"
          image="https://www.gstatic.com/classroom/themes/img_breakfast.jpg"
          alt="bg"
        />
        <Stack spacing={2} direction="row" sx={bannerSx.card_stack}>
          <Box sx={bannerSx.header}>
            <Box sx={bannerSx.header_title}>[CLC]PTUDWNC - 18KTPM1</Box>
            <Box sx={bannerSx.header_section}>EZ</Box>
          </Box>

          <IconButton onClick={toggleShowDetails}>{details ? <Info /> : <InfoOutlined />}</IconButton>
        </Stack>

        <Collapse in={details}>
          <CardContent sx={bannerSx.content}>Sub</CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};
