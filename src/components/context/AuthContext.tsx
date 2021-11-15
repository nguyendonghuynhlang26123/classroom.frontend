import { AuthData, User } from 'common/interfaces';
import { JwtAuthService } from 'services/jwt.service';
import axios from 'axios';
import React from 'react';
const baseURL = 'http://localhost:3001/api/v1';

export type AuthProps = {
  signIn: (data: AuthData) => Promise<any>;
  register: (data: AuthData) => Promise<any>;
  logOut: () => void;
  isAuthenticated: boolean;
  pending: boolean;
  userData: User | undefined;
};

const defaultValue: AuthProps = {
  signIn: () => new Promise(() => {}),
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

  React.useEffect(() => {
    console.log('Check Auth');
    axios.get(baseURL, { withCredentials: true }); // Send get request to get CSRF token once site is visited.
    checkJWT();
  }, []);

  const checkJWT = () => {
    jwtService.init(onAutoLogIn, onAutoLogOut);
  };

  const onAutoLogIn = () => {
    console.log('~ onAutoLogIn');
    jwtService
      .getUserData()
      .then((data: any) => {
        setIsAuthen(true);
        setIsPending(false); //Show that the api has been processed
        setInfor(data.user);
      })
      .catch((err) => {
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
      jwtService.logIn(body).then(onAutoLogIn);
    });
  };

  const register = (body: AuthData) => {
    return new Promise((resolve, reject) => {
      jwtService.register(body).then(onAutoLogIn);
    });
  };

  const logOut = () => {
    setIsAuthen(false);
    return new Promise((resolve, reject) => {
      jwtService.logOut().then(onAutoLogOut);
    });
  };

  const defaultProps: AuthProps = {
    ...defaultValue,
    signIn: logIn,
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
