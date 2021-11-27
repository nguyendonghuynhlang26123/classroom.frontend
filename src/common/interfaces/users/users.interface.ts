import { IBase } from './../base';
export interface IUser extends IBase {
  email: string;
  avatar: string;
  last_name: string;
  first_name: string;
  google_id?: string;
}
