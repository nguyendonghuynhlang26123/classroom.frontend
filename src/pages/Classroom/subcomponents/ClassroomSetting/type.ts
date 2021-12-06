import { IClassroomBody, ClassStudents } from 'common/interfaces';
export type ClassroomSettingProps = {
  classData: IClassroomBody;
};

export type UploadConfirmProps = {
  csvFile: any;
  loading: boolean;
  onClick: VoidFunction;
  onClose: VoidFunction;
};
