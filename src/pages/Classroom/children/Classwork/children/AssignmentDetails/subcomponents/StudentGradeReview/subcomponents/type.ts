import { IUser, IGradeReview } from 'common/interfaces';
export type GradeCommentProps = {
  gr: IGradeReview;
  userData: IUser;
  handleSendBtn: (requestId: string, message: string) => any;
};
