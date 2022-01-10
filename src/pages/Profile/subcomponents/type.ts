import { IChangePassBody } from './../../../common/interfaces/users/changePass.interface';
export type ChangePassBtnPropType = {
  loading: boolean;
  handleSubmit: (body: IChangePassBody) => Promise<any>;
};
