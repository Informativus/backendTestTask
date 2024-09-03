import { CreateUserDto } from 'src/Dto/user/createUser.dto';
import { GetUserDto } from 'src/Dto/user/getUserDto.dto';

export interface IUserGateway {
  findByEmail(email: string): Promise<GetUserDto[]>;
  create(createUserDto: CreateUserDto): Promise<string[]>;
}
