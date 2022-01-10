export type AcceptReviewFormType = {
  handleProceed: (finalGrade: number) => void;
  handleClose: VoidFunction;
  open: boolean;
  totalPoint: number;
  expectPoint: number;
};
