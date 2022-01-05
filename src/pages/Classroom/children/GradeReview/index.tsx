import { Collapse, Grid } from '@mui/material';
import React from 'react';
import { gradeReviewSx } from './style';
import { ReviewCard } from './subcomponents';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useGetAllGradeReviewsQuery } from 'services';
import { useLoading } from 'components';
import Utils from 'common/utils';

const GradeReviewTab = () => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const { data: reviews, isLoading: isFetchingReviews } = useGetAllGradeReviewsQuery(id as string);
  const [loading, setLoading] = useLoading();

  React.useEffect(() => {
    setLoading(isFetchingReviews);
  }, [isFetchingReviews]);

  const handleSelectCard = (reviewId: string) => {
    navigate(`/classroom/${id}/grade-reviews/${reviewId}`);
  };

  return (
    <Collapse timeout={500} appear={true} in={true} sx={gradeReviewSx.root}>
      <Grid container spacing={2} wrap="nowrap" sx={gradeReviewSx.gridContainer}>
        <Grid item xs={3}>
          {reviews && reviews.map((gr, i) => <ReviewCard data={gr} key={i} handleOnClick={handleSelectCard} />)}
        </Grid>
        <Grid item xs={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Collapse>
  );
};
export default GradeReviewTab;
