import { UserRole } from './../../common/interfaces/classes/classroomUser.interface';
import { Classroom, ClassroomUser, InviteUser } from 'common/interfaces';
import { BaseApiService } from 'services';

class ClassroomService extends BaseApiService<any, Classroom> {
  resource = 'classes';

  async getMyRole(classId: string) {
    return (await this._repository.get(`${this.resource}/${classId}/role`)).data;
  }

  async getClassUsers(classId: string): Promise<ClassroomUser[]> {
    return (await this._repository.get(`${this.resource}/${classId}/people`)).data.users;
  }

  async submitInvitation(data: InviteUser) {
    return (await this._repository.post(`${this.resource}/invite`, data)).data;
  }

  async getClassData(classId: string): Promise<any> {
    return {
      myRole: (await this._repository.get(`${this.resource}/${classId}/role`)).data.role as UserRole,
      data: await this.getOne(classId),
    };
  }
}

export default ClassroomService;
