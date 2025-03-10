import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signupDto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthenticatedUser } from 'src/types/AutenticatedUserGoogle.interface';
import { SigninDto } from './dto/signinDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    return { message: 'Redirigiendo a Google para autenticacion' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    const user = req.user as { user: AuthenticatedUser; accessToken: string };

    return {
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.user.id,
        email: user.user.email,
        authProvider: user.user.authProvider,
        createdAt: user.user.createdAt,
        updatedAt: user.user.updatedAt,
      },
      accessToken: user.accessToken,
    };
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
