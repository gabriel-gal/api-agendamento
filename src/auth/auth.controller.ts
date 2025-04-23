import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './JWT/jwt-auth.guard';

@Controller("auth")
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getMe(@Req() req) {
    return req.user;
  }

  @Post()
  validaAuth(@Body() authDto: AuthDto) {
    return this.authService.validaAuth(authDto)
  }
}