import { Module } from '@nestjs/common';
import { StorageModule } from 'src/storage/storage.module';
import { RelationDbService } from 'src/storage/storage.service';
import { CardGatewayService } from './cardGateway/cardGateway.service';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { ColumnsService } from 'src/columns/columns.service';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
  imports: [StorageModule, ColumnsModule],
  controllers: [CardsController],
  providers: [
    CardsService,
    {
      provide: 'IColumn',
      useExisting: ColumnsService,
    },
    {
      provide: 'ICardGateway',
      useClass: CardGatewayService,
    },
    {
      provide: 'IRelationDb',
      useExisting: RelationDbService,
    },
    {
      provide: 'ICard',
      useClass: CardsService,
    },
  ],
  exports: [CardsService],
})
export class CardsModule {}
