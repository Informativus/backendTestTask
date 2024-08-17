import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from 'src/config/config.service';
import { CookieService } from './cookie/cookie.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const token: string = req.cookies[CookieService.tokenKey];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const sessionInfo = this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      req['session'] = sessionInfo;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
