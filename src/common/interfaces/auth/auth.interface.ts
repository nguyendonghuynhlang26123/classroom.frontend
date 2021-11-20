import { IUser } from '../users';
export interface AuthData {
  email: string;
  password: string;
}

export interface RegisterData {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  data: IUser;
  access_token: string;
  refresh_token: string;
}
