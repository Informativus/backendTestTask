import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserGetway } from './userGetway/userGetway.interface';
import { IUser } from './user.interface';
import { GetUserDto } from 'src/Dto/user/getUserDto.dto';

@Injectable()
export class UsersService implements IUser {
  constructor(
    @Inject('IUserGetway')
    private readonly userGetway: IUserGetway,
  ) {}
  async findByEmail(email: string): Promise<GetUserDto> {
    const users: GetUserDto[] = await this.userGetway.findByEmail(email);
    if (!users[0]) {
      throw new BadRequestException('User not found');
    }
    return users[0];
  }
  async create(email: string, hash: string, salt: string): Promise<void> {
    return await this.userGetway.create(email, hash, salt);
  }
}
