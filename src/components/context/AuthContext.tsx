import { AuthData, User } from 'common/interfaces';
import { JwtAuthService } from 'services/jwt.service';
import axios from 'axios';
import React from 'react';
const baseURL = 'http://localhost:3001/api/v1';

export type AuthProps = {
  signIn: (data: AuthData) => Promise<any>;
  register: (data: AuthData) => Promise<any>;
  logOut: (type: any) => void;
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
    console.log('Auth check - ', isAuthen);
    axios.get(baseURL, { withCredentials: true }); // Send get request to get CSRF token once site is visited.
    checkJWT();
  }, []);

  const checkJWT = () => {
    jwtService.setOnAutoLogIn(() => {
      jwtService
        .loginWithExistingToken()
        .then((data: any) => {
          setIsAuthen(true);
          setInfor(data.user);
        })
        .catch((err) => {
          console.error(err);
        });
    });
    jwtService.setOnAutoLogOut(() => {
      setIsAuthen(false);
    });
    jwtService.init();
  };

  const logIn = (body: AuthData) => {
    console.log('AuthContext.tsx ~ line 50 ~ logIn');
    const onLoginSucceed = (data: AuthData) => {
      setIsAuthen(true);
      alert('Logged In');
    };
    return new Promise((resolve, reject) => {
      console.log('log ~ file: AuthContext.tsx ~ line 50 ~ logIn ~ body', body);

      jwtService
        .logIn(body)
        .then((response: any) => {
          onLoginSucceed(body);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const register = (body: AuthData) => {
    console.log('AuthContext.tsx ~ line 50 ~ logIn');
    const onRegisterSucceed = (data: AuthData) => {
      setIsAuthen(true);
      alert('Logged In');
    };
    return new Promise((resolve, reject) => {
      console.log('log ~ file: AuthContext.tsx ~ line 50 ~ logIn ~ body', body);

      jwtService
        .register(body)
        .then((response: any) => {
          onRegisterSucceed(body);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const logOut = () => {
    setIsAuthen(false);
    alert('Logged Out');
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
