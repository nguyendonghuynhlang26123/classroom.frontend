import { AuthData, User } from 'common/interfaces';
import { JwtAuthService } from 'services/jwt.service';
import React from 'react';
const baseURL = '';

const AuthContext = React.createContext(null);

export type AuthProps = {
  signIn: (data: AuthData, other: any) => Promise<any>;
  logOut: (type: any) => void;
  isAuthenticated: boolean;
  userData: User | undefined;
};

export const AuthProvider = ({ children }: { children: any }) => {
  const jwtService = new JwtAuthService();
  const [infor, setInfor] = React.useState<User | undefined>(undefined);
  const [isAuthen, setIsAuthen] = React.useState(false);
  React.useEffect(() => {
    console.log('Auth check - ', isAuthen);
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
    const onLoginSucceed = (data: AuthData) => {
      setIsAuthen(true);
      alert('Logged In');
    };
    return new Promise((resolve, reject) => {
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

  const logOut = () => {
    setIsAuthen(false);
    alert('Logged Out');
    jwtService.logOut();
    return null;
  };

  const defaultProps: AuthProps = {
    signIn: logIn,
    logOut: logOut,
    isAuthenticated: isAuthen,
    userData: infor,
  };

  return <AuthContext.Provider value={defaultProps as any}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
