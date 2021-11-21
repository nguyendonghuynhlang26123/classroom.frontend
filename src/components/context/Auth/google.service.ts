import { repository } from 'services/repository';
import { GoogleValidationData, AuthResponse } from 'common/interfaces';
import { JWT_REFRESH_SESSION_KEY, JWT_SESSION_KEY } from 'common/constants';

class GoogleValidateService {
  resource = '/auth/google-activate';

  async validateToken(token: string): Promise<AuthResponse> {
    const body: GoogleValidationData = { token_id: token };
    return new Promise((resolve, reject) => {
      repository
        .post(`${this.resource}`, body)
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

export default GoogleValidateService;
