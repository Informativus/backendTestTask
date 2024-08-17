import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from 'src/Dto/user/createUser.dto';
import { GetUserDto } from 'src/Dto/user/getUserDto.dto';
import { IRelationDb } from 'src/storage/Interfaces/RelationDb.interface';
import { validateAndMapDto } from 'src/utils/validateAndMapDto.util';
import { IUserGateway } from './userGateway.interface';

export class UserGatewayService implements IUserGateway {
  constructor(
    @Inject('IRelationDb')
    private readonly relationDb: IRelationDb,
  ) {}
  async findByEmail(email: string): Promise<GetUserDto[]> {
    try {
      const users = await this.relationDb.sendQuery({
        text: 'SELECT id, email, hash, salt, first_name as firstName, last_name as lastName, middle_name as middleName FROM users WHERE email = $1 LIMIT 1',
        values: [email],
      });

      return validateAndMapDto(
        users.map((user) => {
          return {
            id: user.id,
            email: user.email,
            firstName: user.firstname,
            lastName: user.lastname,
            middleName: user.middlename,
            salt: user.salt,
            hash: user.hash,
          };
        }),
        GetUserDto,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<number[]> {
    try {
      return await this.relationDb.sendQuery({
        text: 'INSERT INTO users (email, hash, salt, first_name, last_name, middle_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        values: [
          createUserDto.email,
          createUserDto.hash,
          createUserDto.salt,
          createUserDto.firstName,
          createUserDto.lastName,
          createUserDto.middleName,
        ],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
