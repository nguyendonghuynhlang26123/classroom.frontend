import { User } from '../users';
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
  data: User;
  access_token: string;
  refresh_token: string;
}
