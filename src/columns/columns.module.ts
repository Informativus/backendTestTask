import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { StorageModule } from 'src/storage/storage.module';
import { RelationDbService } from 'src/storage/storage.service';
import { ColumnGateway } from './columnGateway/columnGateway.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [StorageModule, AuthModule],
  controllers: [ColumnsController],
  providers: [
    ColumnsService,
    {
      provide: 'IColumn',
      useExisting: ColumnsService,
    },
    {
      provide: 'IColumnGateway',
      useClass: ColumnGateway,
    },
    {
      provide: 'IRelationDb',
      useExisting: RelationDbService,
    },
  ],
})
export class ColumnsModule {}
