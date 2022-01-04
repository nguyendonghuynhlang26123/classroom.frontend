import { Collapse, Grid } from '@mui/material';
import React from 'react';
import { gradeReviewSx } from './style';
import { ReviewCard } from './subcomponents';
import { Outlet } from 'react-router-dom';

const GradeReviewTab = () => {
  return (
    <Collapse timeout={500} appear={true} in={true} sx={gradeReviewSx.root}>
      <Grid container spacing={2} wrap="nowrap" sx={gradeReviewSx.gridContainer}>
        <Grid item xs={3}>
          {Array(20)
            .fill(null)
            .map((gr, i) => (
              <ReviewCard />
            ))}
        </Grid>
        <Grid item xs={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Collapse>
  );
};
export default GradeReviewTab;
