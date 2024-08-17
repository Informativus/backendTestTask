import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { StorageModule } from 'src/storage/storage.module';
import { RelationDbService } from 'src/storage/storage.service';
import { UserGatewayService } from './userGetway/userGatewayService';

@Module({
  imports: [StorageModule],
  providers: [
    UsersService,
    {
      provide: 'IUserGateway',
      useClass: UserGatewayService,
    },
    {
      provide: 'IRelationDb',
      useExisting: RelationDbService,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
