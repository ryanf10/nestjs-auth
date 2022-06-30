import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';
import { UsersController } from './users.controller';
import { usersRolesProvider } from './users-roles.provider';

@Module({
  providers: [UsersService, ...usersProvider, ...usersRolesProvider],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
