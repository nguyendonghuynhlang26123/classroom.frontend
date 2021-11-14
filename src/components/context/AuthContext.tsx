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
  userData: User | undefined;
};

const defaultValue: AuthProps = {
  signIn: () => new Promise(() => {}),
  register: () => new Promise(() => {}),
  logOut: () => {},
  isAuthenticated: false,
  userData: undefined,
};

const AuthContext = React.createContext<AuthProps>(defaultValue);

export const AuthProvider = ({ children }: { children: any }) => {
  const jwtService = new JwtAuthService();
  const [infor, setInfor] = React.useState<User | undefined>(undefined);
  const [isAuthen, setIsAuthen] = React.useState(false);
  React.useEffect(() => {
    axios.get(baseURL, { withCredentials: true }); // Send get request to get CSRF token once site is visited.
    checkJWT();
  }, []);

  const checkJWT = () => {
    jwtService.setOnAutoLogIn(() => {
      jwtService
        .getUserData()
        .then((data: any) => {
          console.log('log ~ file: AuthContext.tsx ~ line 40 ~ .then ~ data', data);
          setIsAuthen(true);
          setInfor(data.user);
        })
        .catch((err) => {
          console.error(err);
        });
    });
    jwtService.setOnAutoLogOut(() => {
      setIsAuthen(false);
      setInfor(undefined);
    });
    jwtService.init();
  };

  const logIn = (body: AuthData) => {
    return jwtService.logIn(body);
  };

  const register = (body: AuthData) => {
    return jwtService.register(body);
  };

  const logOut = () => {
    setIsAuthen(false);
    jwtService.logOut();
    return null;
  };

  const defaultProps: AuthProps = {
    ...defaultValue,
    signIn: logIn,
    register: register,
    logOut: logOut,
    isAuthenticated: isAuthen,
    userData: infor,
  };

  return <AuthContext.Provider value={defaultProps}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
