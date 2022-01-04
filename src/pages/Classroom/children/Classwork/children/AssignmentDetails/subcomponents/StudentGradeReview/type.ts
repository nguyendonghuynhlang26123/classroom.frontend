import { IGradeReview } from 'common/interfaces';
export type StudentGradeReviewType = {
  data: IGradeReview[];
  handleSubmitComment: (requestId: string, message: string) => any;
};
