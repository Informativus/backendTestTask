import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetSessionInfoDto } from 'src/Dto/auth/getSessionInfo.dto';
import { SignInDto } from 'src/Dto/auth/signIn.dto';
import { SignUpDto } from 'src/Dto/auth/signUp.dto';
import { IAuth } from './Interfacec/auth.interface';
import { Response } from 'express';
import { CookieService } from './cookie/cookie.service';
import { TAccessToken } from 'src/Types/accessToken.type';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './decorators/sessionInfo.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuth')
    private readonly authService: IAuth,
    private readonly cookieService: CookieService,
  ) {}
  @Post('/signup')
  @ApiCreatedResponse({ type: SignUpDto })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const accessToken: TAccessToken = await this.authService.signUp(signUpDto);

    this.cookieService.setToken(res, accessToken.accessToken);
  }

  @Post('/signin')
  @ApiCreatedResponse({ type: SignInDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response & { accessToken: string },
  ): Promise<void> {
    const accessToken: TAccessToken = await this.authService.signIn(signInDto);

    this.cookieService.setToken(res, accessToken.accessToken);
  }

  @Delete('/signout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async signOut(@Res({ passthrough: true }) res: Response): Promise<void> {
    this.cookieService.removeToken(res);
  }

  @Get('/session')
  @ApiCreatedResponse({ type: GetSessionInfoDto })
  @UseGuards(AuthGuard)
  async getSessionInfo(
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<GetSessionInfoDto> {
    return session;
  }
}
