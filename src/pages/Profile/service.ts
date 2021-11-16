import { UserDataUpdate, User } from 'common/interfaces';
import { BaseApiService } from 'services';

class UserService extends BaseApiService<UserDataUpdate, User> {
  resource = 'users';
}

export default UserService;
