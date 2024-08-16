import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordService } from './password/password.service';
import { CookieService } from './cookie/cookie.service';

@Module({
  providers: [AuthService, PasswordService, CookieService],
  controllers: [AuthController]
})
export class AuthModule {}
