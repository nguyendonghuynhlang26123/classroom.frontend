import { IGradeReview } from 'common/interfaces';
export type ReviewCardProps = {
  data: IGradeReview;
  handleOnClick: (id: string) => any;
  isActive: boolean;
};
