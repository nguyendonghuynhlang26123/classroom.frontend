import { Collapse, Grid } from '@mui/material';
import React from 'react';
import { gradeReviewSx } from './style';
import { ReviewCard } from './subcomponents';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useGetAllGradeReviewsQuery } from 'services';
import { useLoading, NoResourceDisplay, ClassroomTab } from 'components';
import Utils from 'common/utils';
import Success from 'assets/images/success.svg';
import { UserRole } from 'common/interfaces';

const GradeReviewTab = () => {
  const { id, reviewId } = useParams();
  const navigate = useNavigate();
  const { data: reviews, isLoading: isFetchingReviews } = useGetAllGradeReviewsQuery(id as string);
  const [loading, setLoading] = useLoading();

  const [active, setActive] = React.useState<string>(reviewId ?? '');

  React.useEffect(() => {
    setLoading(isFetchingReviews);
  }, [isFetchingReviews]);

  const handleSelectCard = (reviewId: string) => {
    navigate(`/classroom/${id}/grade-reviews/${reviewId}`);
    setActive(reviewId);
  };

  const handleGuardNavigate = (params: any): string => {
    const { id } = params;
    if (id) return `/classroom/${id}/work`;
    return '/not-found';
  };

  return (
    <ClassroomTab roles={[UserRole.TEACHER, UserRole.OWNER]} navigateTo={handleGuardNavigate}>
      {reviews && reviews.length > 0 ? (
        <Grid container spacing={2} wrap="nowrap" sx={gradeReviewSx.gridContainer}>
          <Grid item xs={3}>
            {reviews.map((gr, i) => (
              <ReviewCard isActive={gr._id === active} data={gr} key={i} handleOnClick={handleSelectCard} />
            ))}
          </Grid>
          <Grid item xs={9}>
            <Outlet />
          </Grid>
        </Grid>
      ) : (
        <NoResourceDisplay
          title="No grade review request submited yet!"
          img={Success}
          description={<>Students are happy with their grades! Yay!!!</>}
        />
      )}
    </ClassroomTab>
  );
};
export default GradeReviewTab;
