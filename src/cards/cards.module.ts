import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { StorageModule } from 'src/storage/storage.module';
import { RelationDbService } from 'src/storage/storage.service';
import { CardGatewayService } from './cardGateway/cardGateway.service';

@Module({
  imports: [StorageModule],
  controllers: [CardsController],
  providers: [
    CardsService,
    {
      provide: 'ICardGateway',
      useClass: CardGatewayService,
    },
    {
      provide: 'IRelationDb',
      useClass: RelationDbService,
    },
    {
      provide: 'ICard',
      useClass: CardsService,
    },
  ],
  exports: [CardsService],
})
export class CardsModule {}
