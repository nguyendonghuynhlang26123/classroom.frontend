import { repository } from './repository';
import { JWT_SESSION_KEY, JWT_REFRESH_SESSION_KEY } from './../common/constants/index';
import { AuthData } from 'common/interfaces';
import jwtDecode from 'jwt-decode';

export class JwtAuthService {
  init(loginCallback: VoidFunction, logoutCallback: VoidFunction) {
    let access_token = localStorage.getItem(JWT_SESSION_KEY);
    let refresh_token = localStorage.getItem(JWT_REFRESH_SESSION_KEY);

    repository.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          this._setSession(null, null); //Reset session
          logoutCallback(); // Callback
        }
        return Promise.reject(err.response.data);
      },
    );

    if (this.isAuthTokenValid(access_token)) {
      this._setSession(access_token, refresh_token); // SET for axios.default.header
      loginCallback();
    } else {
      //TODO: Make use of Refresh token
      this._setSession(null, null); //Reset session
      logoutCallback();
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
            resolve(response.data);
          }
        })
        .catch((response) => reject(response));
    });
  }

  register(body: AuthData) {
    return new Promise((resolve, reject) => {
      repository
        .post(`/auth/register`, body)
        .then((response: any) => {
          if (response) {
            // TODO: login after registered ?
            // const access_token = response.data.access_token;
            // const refresh_token = response.data.refresh_token;
            // this._setSession(access_token, refresh_token);

            resolve(response.data);
          }
        })
        .catch((response) => reject(response));
    });
  }

  logOut() {
    const refresh_token: any = localStorage.getItem(JWT_REFRESH_SESSION_KEY);
    return new Promise((resolve, reject) => {
      repository
        .post(`/auth/logout`, { refresh_token })
        .then((response: any) => {
          this._setSession(null, null);

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
