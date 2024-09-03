import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/Dto/user/createUser.dto';
import { GetUserDto } from 'src/Dto/user/getUserDto.dto';
import { IsValidDto } from 'src/validators/isValidDto.validator';
import { IUser } from './user.interface';
import { IUserGateway } from './userGetway/userGateway.interface';
import { TNewUser } from 'src/Types/newUser.type';

@Injectable()
export class UsersService implements IUser {
  constructor(
    @Inject('IUserGateway')
    private readonly userGateway: IUserGateway,
  ) {}
  async findByEmail(email: string): Promise<GetUserDto> {
    const users: GetUserDto[] = await this.userGateway.findByEmail(email);
    return users[0];
  }

  @IsValidDto(CreateUserDto)
  async create(createUserDto: CreateUserDto): Promise<TNewUser> {
    const usersIds: string[] = await this.userGateway.create(createUserDto);

    if (!usersIds[0]) {
      throw new InternalServerErrorException('Failed to create user');
    }

    return {
      email: usersIds[0],
    };
  }
}
