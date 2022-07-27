import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { User } from './decorators/user.decorator';
import { User as UserEntity } from './user.entity';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async profile(@User() user: UserEntity) {
    const data = await this.userService.profile(user.id);
    return { result: { user: data } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/me')
  async updateProfile(@User() user: UserEntity, @Body() body: UpdateUserDto) {
    const data = await this.userService.updateProfile(
      user.id,
      body.name,
      body.gender,
    );
    return { result: { user: data } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/change-password')
  async changePassword(
    @User() user: UserEntity,
    @Body() body: UpdatePasswordDto,
  ) {
    await this.userService.changePassword(
      user.id,
      body.old_password,
      body.new_password,
    );
    return { messages: 'Password changed successfully' };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get('/tes')
  async tes() {
    return { result: "You're authenticated and authorized!" };
  }
}
