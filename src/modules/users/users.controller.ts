import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  profile(@Request() req) {
    return this.userService.profile(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/me')
  async updateProfile(@Request() req, @Body() body: UpdateUserDto) {
    return await this.userService.updateProfile(
      req.user.id,
      body.name,
      body.gender,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/change-password')
  async changePassword(@Request() req, @Body() body: UpdatePasswordDto) {
    await this.userService.changePassword(
      req.user.id,
      body.old_password,
      body.new_password,
    );
  }
}
