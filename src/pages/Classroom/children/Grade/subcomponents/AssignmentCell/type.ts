import { IAssignment } from 'common/interfaces';
export type AssignmentCellProps = {
  data: IAssignment;
  onDownloadTemplate: () => any;
  onDownloadGrade: () => any;
  onUploadGrade: () => any;
  onFinalizeGrade: () => any;
};
