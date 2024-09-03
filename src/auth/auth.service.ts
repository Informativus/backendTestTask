import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from 'src/Dto/auth/signIn.dto';
import { SignUpDto } from 'src/Dto/auth/signUp.dto';
import { IUser } from 'src/users/user.interface';
import { IAuth } from './Interfacec/auth.interface';
import { PasswordService } from './password/password.service';
import { CreateUserDto } from 'src/Dto/user/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { TNewUser } from 'src/Types/newUser.type';
import { TAccessToken } from 'src/Types/accessToken.type';

@Injectable()
export class AuthService implements IAuth {
  constructor(
    @Inject('IUser')
    private readonly userService: IUser,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<TAccessToken> {
    const user = await this.userService.findByEmail(signUpDto.email);

    if (user) {
      throw new BadRequestException({
        type: 'email-exeption',
        message: 'User with this email already exists',
      });
    }

    const salt: string = this.passwordService.getSalt();
    const hash: string = this.passwordService.getHash(signUpDto.password, salt);
    const createUserDto: CreateUserDto = {
      email: signUpDto.email,
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
      middleName: signUpDto.middleName,
      salt,
      hash,
    };

    const newUser: TNewUser = await this.userService.create(createUserDto);

    const accessToken: string = await this.jwtService.signAsync({
      email: newUser.email,
    });

    return { accessToken };
  }

  async signIn(signInDto: SignInDto): Promise<TAccessToken> {
    const user = await this.userService.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'User not found',
      });
    }

    const hash: string = this.passwordService.getHash(
      signInDto.password,
      user.salt,
    );

    if (hash !== user.hash) {
      throw new UnauthorizedException({
        message: 'Wrong password',
      });
    }

    const accessToken: string = await this.jwtService.signAsync({
      email: user.email,
    });

    console.log(accessToken);

    return { accessToken };
  }
}
