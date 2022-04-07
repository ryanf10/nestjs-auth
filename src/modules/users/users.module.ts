import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';

@Module({
  providers: [UsersService, ...usersProvider],
  exports: [UsersService],
})
export class UsersModule {}
