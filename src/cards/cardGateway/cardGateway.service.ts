import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CardDto } from 'src/Dto/cards/card.dto';
import { CardIdDto } from 'src/Dto/cards/cardId.dto';
import { CreateCardDto } from 'src/Dto/cards/createCard.dto';
import { ColumnIdDto } from 'src/Dto/column/columnIdDto';
import { ICardGateway } from './cardGateway.interface';
import { IRelationDb } from 'src/storage/Interfaces/RelationDb.interface';
import { validateAndMapDto } from 'src/utils/validateAndMapDto.util';

@Injectable()
export class CardGatewayService implements ICardGateway {
  constructor(
    @Inject('IRelationDb')
    private readonly relationDb: IRelationDb,
  ) {}
  async getCardsByColumnId(columnId: ColumnIdDto): Promise<CardDto[]> {
    try {
      const cards = await this.relationDb.sendQuery({
        text: 'SELECT id, name FROM cards WHERE column_id = $1',
        values: [columnId.id],
      });

      return validateAndMapDto(
        cards.map((card) => {
          return {
            id: card.id,
            name: card.name,
          };
        }),
        CardDto,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to get cards by column id',
      );
    }
  }

  async createCard(createCard: CreateCardDto): Promise<CardIdDto[]> {
    try {
      const cardIds: CardIdDto[] = await this.relationDb.sendQuery({
        text: 'INSERT INTO cards (column_id, name) VALUES ($1, $2) RETURNING id',
        values: [createCard.columnId, createCard.name],
      });

      return validateAndMapDto(
        cardIds.map((cardId) => {
          return {
            id: cardId.id,
          };
        }),
        CardIdDto,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create card');
    }
  }

  async updateCardName(card: CardDto): Promise<void> {
    try {
      await this.relationDb.sendQuery({
        text: 'UPDATE cards SET name = $1 WHERE id = $2',
        values: [card.name, card.id],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update card name');
    }
  }

  async deleteCard(cardId: CardIdDto): Promise<void> {
    try {
      await this.relationDb.sendQuery({
        text: 'DELETE FROM cards WHERE id = $1',
        values: [cardId.id],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to delete card');
    }
  }

  async getCardById(cardId: number): Promise<number> {
    try {
      const data = await this.relationDb.sendQuery({
        text: 'SELECT COUNT(*) FROM cards WHERE id = $1',
        values: [cardId],
      });
      return data[0].count;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to get card by id');
    }
  }
}
