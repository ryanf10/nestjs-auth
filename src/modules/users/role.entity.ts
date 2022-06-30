import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRole } from './user-role.entity';
import { User } from './user.entity';

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  @Column({
    type: DataType.STRING,
  })
  roleName: string;

  @BelongsToMany(() => User, () => UserRole)
  roles: Role[];
}
