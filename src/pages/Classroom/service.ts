import { Classroom, ClassroomUser } from 'common/interfaces';
import { BaseApiService } from 'services';

class ClassroomService extends BaseApiService<any, Classroom> {
  resource = 'classes';

  async getMyRole(classId: string) {
    return (await this._repository.get(`${this.resource}/${classId}/role`)).data;
  }

  async getClassUsers(classId: string): Promise<ClassroomUser[]> {
    return (await this._repository.get(`${this.resource}/${classId}/people`)).data.users;
  }
}

export default ClassroomService;
