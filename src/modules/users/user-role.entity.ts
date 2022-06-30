import { ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.entity';
import { Role } from './role.entity';

@Table({ tableName: 'user_role' })
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => Role)
  roleId: number;
}
