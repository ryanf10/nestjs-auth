import { User } from './user.entity';
import { USER_REPOSITORY } from '../../core/constants';

export const usersProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
