import React from 'react';
import { Box, CardActions, IconButton, Stack, CardMedia, CardContent, Card } from '@mui/material';
import { cardSx } from './style';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { ClassCardProps } from './type';

export const ClassCard = ({ title, section, onClick }: ClassCardProps) => {
  return (
    <Card sx={cardSx.card} elevation={0}>
      <CardMedia
        component="img"
        height="100"
        image="https://www.gstatic.com/classroom/themes/img_breakfast.jpg"
        alt="bg"
      />
      <Stack spacing={2} direction="row" sx={cardSx.header}>
        <Box width={200} onClick={onClick}>
          <Box sx={cardSx.header_title} component="div">
            {title}
          </Box>
          <Box sx={cardSx.header_section} component="div">
            {section}
          </Box>
        </Box>

        <IconButton>
          <MoreVertIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Stack>

      <CardContent sx={{ minHeight: 100 }}></CardContent>
      <CardActions sx={cardSx.actions}>
        <IconButton size="medium" color="primary">
          <TrendingUpIcon />
        </IconButton>
        <IconButton size="medium" color="primary">
          <FolderOpenIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
