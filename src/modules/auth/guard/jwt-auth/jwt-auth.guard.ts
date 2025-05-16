import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('context => ', context);

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    console.log('err => ', err);
    console.log('user => ', user);
    if (err || !user) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }
}
