import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signupDto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { SigninDto } from './dto/signinDto';
import { JwtAuthGuard } from './guard/jwt-auth/jwt-auth.guard';
import { AuthenticatedRequest } from './interface/request.interface';

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
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    console.log('usuario autentificado', req.user);
    const user = req.user as { accessToken: string };

    if (!user || !user.accessToken) {
      return res.redirect(
        `http://161.97.115.144:4200/login?error=NoAccessToken`,
      );
    }

    res.cookie('token', user.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.redirect(`http://161.97.115.144:4200/welcome`);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signup')
  signup(@Req() req: AuthenticatedRequest, @Body() signupDto: SignupDto) {
    return this.authService.signup(req.user.id, signupDto);
  }

  @Post('signin')
  async signin(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signin(signinDto);

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { user: result.user };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return { message: 'Sesión cerrada correctamente' };
  }

  // auth.controller.ts
  @UseGuards(JwtAuthGuard)
  @Get('verificar')
  me(@Req() req: Request) {
    return req['user'];
  }
}
