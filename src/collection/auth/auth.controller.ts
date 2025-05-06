import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { ApiOperation } from '@nestjs/swagger';
import { LoginByPasswordDto } from './dtos/login-by-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'login with username, password' })
  @Post('login')
  async login(@Body() dto: LoginByPasswordDto) {
    return await this.authService.getTokenFromUser(dto.username);
  }
}
