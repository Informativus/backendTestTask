import { GetUserDto } from 'src/Dto/user/getUserDto.dto';

export interface IUserGetway {
  findByEmail(email: string): Promise<GetUserDto[]>;
  create(email: string, hash: string, salt: string): Promise<void>;
}
