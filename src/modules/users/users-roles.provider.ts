import { USER_ROLE_REPOSITORY } from '../../core/constants';
import { UserRole } from './user-role.entity';

export const usersRolesProvider = [
  {
    provide: USER_ROLE_REPOSITORY,
    useValue: UserRole,
  },
];
