import { SignInDto } from 'src/Dto/auth/signIn.dto';
import { SignUpDto } from 'src/Dto/auth/signUp.dto';
import { TAccessToken } from 'src/Types/accessToken.type';

export interface IAuth {
  signUp(signUpDto: SignUpDto): Promise<TAccessToken>;
  signIn(signInDto: SignInDto): Promise<TAccessToken>;
}
