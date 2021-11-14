import { repository } from './repository';
import { JWT_SESSION_KEY, JWT_REFRESH_SESSION_KEY } from './../common/constants/index';
import { AuthData } from 'common/interfaces';
import jwtDecode from 'jwt-decode';

export class JwtAuthService {
  private _onAutoLogOut: () => void = () => {};
  private _onAutoLogIn: () => void = () => {};

  setOnAutoLogOut(fn: () => void) {
    this._onAutoLogOut = fn;
  }

  setOnAutoLogIn(fn: () => void) {
    this._onAutoLogIn = fn;
  }
  init() {
    //Set interceptors when failing
    repository.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          if (this._onAutoLogOut) this._onAutoLogOut();
          this._setSession(null, null); //Reset session
        }
      },
    );

    let access_token = localStorage.getItem(JWT_SESSION_KEY);
    let refresh_token = localStorage.getItem(JWT_REFRESH_SESSION_KEY);
    if (!access_token) return;

    if (this.isAuthTokenValid(access_token)) {
      this._setSession(access_token, refresh_token); // SET for axios.default.header
      if (this._onAutoLogIn) this._onAutoLogIn();
    } else {
      //TODO: Make use of Refresh token
      this._setSession(null, null); //Reset session
      if (this._onAutoLogOut) this._onAutoLogOut();
    }
  }

  logIn(body: AuthData) {
    return new Promise((resolve, reject) => {
      //TODO: Check again
      repository
        .post(`/auth/login`, body)
        .then((response: any) => {
          if (response.data) {
            //eslint disable
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;
            this._setSession(access_token, refresh_token);
            if (this._onAutoLogIn) this._onAutoLogIn();
            resolve(response.data);
          }
        })
        .catch((response) => reject(response));
    });
  }

  register(body: AuthData) {
    return new Promise((resolve, reject) => {
      //TODO: Check again
      repository
        .post(`/auth/register`, body)
        .then((response: any) => {
          if (response.data) {
            //eslint disable
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;
            this._setSession(access_token, refresh_token);

            if (this._onAutoLogIn) this._onAutoLogIn();
            resolve(response.data);
          }
        })
        .catch((response) => reject(response));
    });
  }

  logOut() {
    const refresh_token: any = localStorage.getItem(JWT_REFRESH_SESSION_KEY);
    return new Promise((resolve, reject) => {
      //TODO: Check again
      repository
        .post(`/auth/logout`, { refresh_token })
        .then((response: any) => {
          this._setSession(null, null);
          if (this._onAutoLogOut) this._onAutoLogOut();
          resolve(response.data);
        })
        .catch((response) => reject(response));
    });
  }

  getUserData() {
    //TODO: change api here
    const token: any = localStorage.getItem(JWT_SESSION_KEY);
    const decoded: any = jwtDecode(token);

    return new Promise((resolve, reject) => {
      repository
        .get(`/users/${decoded?._id}`)
        .then((response: any) => {
          if (response.data) {
            resolve(response.data);
          }
        })
        .catch((response) => reject(response));
    });
  }

  isAuthTokenValid = (access_token: string | null) => {
    if (!access_token) {
      return false;
    }
    const decoded: any = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    } else {
      return true;
    }
  };

  //HELPER FUNCTIONS
  _setSession = (access_token: string | null, refresh_token: string | null) => {
    console.log('log ~ file: jwt.service.ts ~ line 128 ~ JwtAuthService ~ _setSession', access_token);
    if (access_token) {
      localStorage.setItem(JWT_SESSION_KEY, access_token);
      repository.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    } else {
      localStorage.removeItem(JWT_SESSION_KEY);
      delete repository.defaults.headers.common['Authorization'];
    }

    if (refresh_token) {
      localStorage.setItem(JWT_REFRESH_SESSION_KEY, refresh_token);
    } else localStorage.removeItem(JWT_REFRESH_SESSION_KEY);
  };
}
