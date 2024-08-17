import { Inject, Injectable } from '@nestjs/common';
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
    const usersIds: number[] = await this.userGateway.create(createUserDto);
    return {
      id: usersIds[0],
    };
  }
}
