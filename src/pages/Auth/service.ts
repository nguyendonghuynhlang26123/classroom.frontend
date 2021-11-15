import { BaseRepository } from 'services';
import { GoogleValidationData, AuthResponse } from 'common/interfaces';

class GoogleValidateService extends BaseRepository<GoogleValidationData, AuthResponse> {
  resource = '/auth/google-activate';

  async validateToken(token: string) {
    const body: GoogleValidationData = { token_id: token };
    return (await this._repository.post(`${this.resource}`, body)).data;
  }
}

export default GoogleValidateService;
