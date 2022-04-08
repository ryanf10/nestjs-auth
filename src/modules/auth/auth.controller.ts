import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response) {
    const { user, token } = await this.authService.login(req.user);
    response.cookie('token', token, {
      maxAge: 48 * 60 * 60 * 1000,
      httpOnly: true,
    });
    response.send(user);
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  async logout(@Request() req, @Res({ passthrough: true }) response) {
    response.clearCookie('token');
    response.send();
  }
}
