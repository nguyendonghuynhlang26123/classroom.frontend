import { AuthData, AuthResponse, User } from 'common/interfaces';
import JwtAuthService from './jwt.service';
import GoogleValidateService from './google.service';

import axios from 'axios';
import React from 'react';
const baseURL = 'http://localhost:3001/api/v1';

export type AuthProps = {
  signIn: (data: AuthData) => Promise<any>;
  signInWithGG: (tokenId: string) => Promise<any>;
  register: (data: AuthData) => Promise<any>;
  logOut: () => void;
  isAuthenticated: boolean;
  pending: boolean;
  userData: User | undefined;
};

const defaultValue: AuthProps = {
  signIn: () => new Promise(() => {}),
  signInWithGG: () => new Promise(() => {}),
  register: () => new Promise(() => {}),
  logOut: () => {},
  isAuthenticated: false,
  pending: true, //Auth in pending
  userData: undefined,
};

const AuthContext = React.createContext<AuthProps>(defaultValue);

export const AuthProvider = ({ children }: { children: any }) => {
  const [infor, setInfor] = React.useState<User | undefined>(undefined);
  const [isAuthen, setIsAuthen] = React.useState<boolean>(false);
  const [pending, setIsPending] = React.useState<boolean>(true);
  const jwtService = new JwtAuthService();
  const ggService = new GoogleValidateService();

  const checkJWT = () => {
    jwtService.init(onAutoLogIn, onAutoLogOut);
  };
  
  React.useEffect(() => {
    console.log('Check Auth');
    axios.get(baseURL, { withCredentials: true }); // Send get request to get CSRF token once site is visited.
    checkJWT();
  }, []);

  const onAutoLogIn = () => {
    console.log('~ onAutoLogIn');
    jwtService
      .getUserData()
      .then((data: any) => {
        setIsAuthen(true);
        setIsPending(false); //Show that the api has been processed
        setInfor(data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const onAutoLogOut = () => {
    console.log('~ onAutoLogOut');
    setIsAuthen(false);
    setIsPending(false); //Show that the api has been processed
    setInfor(undefined);
  };

  const logIn = (body: AuthData) => {
    return new Promise((resolve, reject) => {
      jwtService.logIn(body).then((response: any) => {
        onAutoLogIn();
        resolve(response);
      });
    });
  };

  const loginWithGoogle = (token: string) => {
    return new Promise((resolve, reject) => {
      ggService
        .validateToken(token)
        .then((response: AuthResponse) => {
          setIsAuthen(true);
          setIsPending(false); //Show that the api has been processed
          setInfor(response.data);
          resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  const register = (body: AuthData) => {
    return new Promise((resolve, reject) => {
      jwtService
        .register(body)
        .then(() => {
          onAutoLogIn();
          resolve(body);
        })
        .catch((res) => {
          reject(res);
        });
    });
  };

  const logOut = () => {
    setIsAuthen(false);
    return jwtService.logOut().then(onAutoLogOut);
  };

  const defaultProps: AuthProps = {
    ...defaultValue,
    signIn: logIn,
    signInWithGG: loginWithGoogle,
    register: register,
    logOut: logOut,
    isAuthenticated: isAuthen,
    pending: pending,
    userData: infor,
  };

  return <AuthContext.Provider value={defaultProps}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
