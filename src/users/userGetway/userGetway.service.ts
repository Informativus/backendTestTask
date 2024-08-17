import { GetUserDto } from 'src/Dto/user/getUserDto.dto';
import { IRelationDb } from 'src/storage/Interfaces/RelationDb.interface';
import { validateAndMapDto } from 'src/utils/validateAndMapDto.util';
import { IUserGetway } from './userGetway.interface';
import { InternalServerErrorException } from '@nestjs/common';

export class UserGetwayService implements IUserGetway {
  constructor(private readonly relationDb: IRelationDb) {}
  async findByEmail(email: string): Promise<GetUserDto[]> {
    try {
      const users = await this.relationDb.sendQuery({
        text: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
        values: [email],
      });

      return validateAndMapDto(users, GetUserDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to find user');
    }
  }
  async create(email: string, hash: string, salt: string): Promise<void> {
    try {
      await this.relationDb.sendQuery({
        text: 'INSERT INTO users (email, hash, salt) VALUES ($1, $2, $3)',
        values: [email, hash, salt],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
