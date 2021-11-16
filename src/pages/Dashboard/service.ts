import { Classroom } from 'common/interfaces';
import { GenericGetAllResponse } from './../../common/interfaces/response/generic.interface';
import { BaseApiService } from 'services';
import { FormData } from './type';

class ClassroomService extends BaseApiService<FormData, Classroom> {
  resource = 'classes';

  getClassList(): Promise<GenericGetAllResponse<Classroom>> {
    return new Promise((resolve, reject) => {
      this.get().then((response: any) => {
        resolve(response);
      });
    });
  }

  async joinClassRoom(code: string) {
    return {};
  }
}

export default ClassroomService;
