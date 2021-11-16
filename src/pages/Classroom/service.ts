import { Classroom, ClassroomUser, InviteUser } from 'common/interfaces';
import { BaseApiService } from 'services';

class ClassroomService extends BaseApiService<any, Classroom> {
  resource = 'classes';

  async getMyRole(classId: string) {
    return (await this._repository.get(`${this.resource}/${classId}/role`)).data;
  }

  async getClassUsers(classId: string): Promise<ClassroomUser[]> {
    const data = (await this._repository.get(`${this.resource}/${classId}/people`)).data.users;
    return data;
  }

  async submitInvitation(data: InviteUser) {
    return (await this._repository.post(`${this.resource}/invite`, data)).data;
  }
}

export default ClassroomService;
