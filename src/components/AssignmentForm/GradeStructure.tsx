import React from 'react';
import { Box, Typography, Stack, IconButton, Button } from '@mui/material';
import { formSx } from './style';
import { Add } from '@mui/icons-material';

export const GradeStructure = () => {
  return (
    <Box sx={formSx.form}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={formSx.formHeader}>Grading criterias</Typography>

        <Button endIcon={<Add />} variant="outlined">
          Add a criteria
        </Button>
      </Stack>
    </Box>
  );
};
