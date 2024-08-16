import { Module } from '@nestjs/common';
import { RelationDbService } from './storage.service';
import { ConfigService } from 'src/config/config.service';

@Module({
  providers: [
    RelationDbService,
    ConfigService,
    { provide: 'IRelationDb', useClass: RelationDbService },
  ],
  exports: [RelationDbService],
})
export class StorageModule {}
