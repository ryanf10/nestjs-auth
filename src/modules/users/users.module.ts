import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, ...usersProvider],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
