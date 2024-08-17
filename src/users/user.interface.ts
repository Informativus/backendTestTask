import { CreateUserDto } from 'src/Dto/user/createUser.dto';
import { GetUserDto } from 'src/Dto/user/getUserDto.dto';
import { TNewUser } from 'src/Types/newUser.type';

export interface IUser {
  findByEmail(email: string): Promise<GetUserDto>;
  create(createUserDto: CreateUserDto): Promise<TNewUser>;
}
