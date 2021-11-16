import { Classroom } from 'common/interfaces';
import { BaseApiService } from 'services';

class ClassroomService extends BaseApiService<any, Classroom> {
  resource = 'classes';
}

export default ClassroomService;
