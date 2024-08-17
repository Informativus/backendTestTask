import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  static tokenKey = 'token-access';
  setToken(res: Response, token: string) {
    res.cookie(CookieService.tokenKey, token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    console.log(token);
  }

  removeToken(res: Response) {
    res.clearCookie(CookieService.tokenKey);
  }
}
