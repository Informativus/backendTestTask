import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ICard } from './card.interface';
import { CardDto } from 'src/Dto/cards/card.dto';
import { CardIdDto } from 'src/Dto/cards/cardId.dto';
import { CreateCardDto } from 'src/Dto/cards/createCard.dto';
import { ColumnIdDto } from 'src/Dto/column/columnIdDto';
import { ICardGateway } from './cardGateway/cardGateway.interface';

@Injectable()
export class CardsService implements ICard {
  constructor(
    @Inject('ICardGateway')
    private readonly cardGateway: ICardGateway,
  ) {}
  async getCardsByColumnId(columnId: ColumnIdDto): Promise<CardDto[]> {
    const cards: CardDto[] =
      await this.cardGateway.getCardsByColumnId(columnId);

    if (cards.length === 0) {
      throw new HttpException('No cards found', HttpStatus.NO_CONTENT);
    }

    return cards;
  }

  async createCard(createCard: CreateCardDto): Promise<CardIdDto> {
    if (!(await this.isExistsCard(createCard.columnId))) {
      throw new BadRequestException('Column not found');
    }
    const cardIds: CardIdDto[] = await this.cardGateway.createCard(createCard);

    if (cardIds.length === 0) {
      throw new InternalServerErrorException('Failed to create column');
    }

    return cardIds[0];
  }

  async updateCardName(card: CardDto): Promise<void> {
    if (await this.isExistsCard(card.id)) {
      await this.cardGateway.updateCardName(card);
    } else {
      throw new BadRequestException('Card not found');
    }
  }

  async deleteCard(cardId: CardIdDto): Promise<void> {
    if (await this.isExistsCard(cardId.id)) {
      return this.cardGateway.deleteCard(cardId);
    } else {
      throw new BadRequestException('Card not found');
    }
  }

  private async isExistsCard(cardId: number): Promise<boolean> {
    const cardCount: number = await this.cardGateway.getCardById(cardId);
    return cardCount > 0;
  }
}
