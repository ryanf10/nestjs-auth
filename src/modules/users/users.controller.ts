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
  async profile(@Request() req) {
    const user = await this.userService.profile(req.user.id);
    return { result: { user } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/me')
  async updateProfile(@Request() req, @Body() body: UpdateUserDto) {
    const user = await this.userService.updateProfile(
      req.user.id,
      body.name,
      body.gender,
    );
    return { result: { user } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/change-password')
  async changePassword(@Request() req, @Body() body: UpdatePasswordDto) {
    await this.userService.changePassword(
      req.user.id,
      body.old_password,
      body.new_password,
    );
    return { messages: 'Password changed successfully' };
  }
}
