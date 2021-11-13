import axios from 'axios';
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
    axios.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          if (this._onAutoLogOut) this._onAutoLogOut();
          this._setSession(null);
        }
      },
    );

    let access_token = window.localStorage.getItem('jwt_access_token');
    if (!access_token) return;

    if (this.isAuthTokenValid(access_token)) {
      this._setSession(access_token);
      if (this._onAutoLogIn) this._onAutoLogIn();
    } else {
      this._setSession(null);
      if (this._onAutoLogOut) this._onAutoLogOut();
    }
  }

  logIn(body: AuthData) {
    return new Promise((resolve, reject) => {
      //TODO: call login api here
      axios
        .post('/api/login', {
          data: body,
        })
        .then((response: any) => {
          if (response.data) {
            //eslint disable
            this._setSession(response.data.access_token);
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
    });
  }

  logOut() {
    this._setSession(null);
  }

  loginWithExistingToken() {
    //TODO: change api here
    const token = window.localStorage.getItem('jwt_access_token');
    return new Promise((resolve, reject) => {
      axios
        .post('/api/auth/access_token', {
          data: token,
        })
        .then((response: any) => {
          if (response.data) {
            this._setSession(response.data.access_token);
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
    });
  }

  register(data: AuthData) {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/register', data).then((response: any) => {
        if (response.data.user) {
          this._setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
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
  _setSession = (access_token: string | null) => {
    if (access_token) {
      localStorage.setItem('access_token', access_token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    } else {
      localStorage.removeItem('access_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };
}
