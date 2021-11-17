import { JoinClass, UserRole } from 'common/interfaces';
import { BaseApiService } from 'services';

class InvitationService extends BaseApiService<JoinClass, any> {
  resource = 'classes';

  async joinClassroom(classId: string, code: string, role: UserRole): Promise<any> {
    const data: JoinClass = {
      class_id: classId,
      code: code,
      role: role,
    };
    if (UserRole.STUDENT === role) return (await this._repository.post(`${this.resource}/join`, data)).data;
    else return (await this._repository.post(`${this.resource}/invite/accept`, data)).data;
  }
}

export default InvitationService;
