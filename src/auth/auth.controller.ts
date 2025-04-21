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
      return res.redirect(`http://localhost:4200/login?error=NoAccessToken`);
    }

    return res.redirect(
      `http://localhost:4200/login?token=${user.accessToken}`,
    );
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
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
