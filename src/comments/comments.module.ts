import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { StorageModule } from 'src/storage/storage.module';
import { CommentsGatewayService } from './commentsGateway/commentsGateway.service';
import { RelationDbService } from 'src/storage/storage.service';
import { CardsService } from 'src/cards/cards.service';
import { CardsModule } from 'src/cards/CardsModule';

@Module({
  imports: [StorageModule, CardsModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    {
      provide: 'ICard',
      useExisting: CardsService,
    },
    {
      provide: 'ICommentsGateway',
      useClass: CommentsGatewayService,
    },
    {
      provide: 'IRelationDb',
      useExisting: RelationDbService,
    },
    {
      provide: 'IComments',
      useClass: CommentsService,
    },
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
