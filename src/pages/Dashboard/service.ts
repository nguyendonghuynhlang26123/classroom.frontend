import { BaseRepository } from 'services';
import { ClassData, FormData } from './type';

class ClassroomRepository extends BaseRepository<FormData, ClassData> {
  resource = 'classes';
}

export default ClassroomRepository;
