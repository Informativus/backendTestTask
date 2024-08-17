import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { StorageModule } from 'src/storage/storage.module';
import { RelationDbService } from 'src/storage/storage.service';
import { UserGetwayService } from './userGetway/userGetway.service';

@Module({
  imports: [StorageModule],
  providers: [
    UsersService,
    {
      provide: 'IUserGetway',
      useClass: UserGetwayService,
    },
    {
      provide: 'IRelationDb',
      useExisting: RelationDbService,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
