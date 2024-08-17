import { CardDto } from 'src/Dto/cards/card.dto';
import { CardIdDto } from 'src/Dto/cards/cardId.dto';
import { CreateCardDto } from 'src/Dto/cards/createCard.dto';
import { ColumnIdDto } from 'src/Dto/column/columnIdDto';

export interface ICardGateway {
  getCardsByColumnId(columnId: ColumnIdDto): Promise<CardDto[]>;
  createCard(createCard: CreateCardDto): Promise<CardIdDto[]>;
  updateCardName(card: CardDto): Promise<void>;
  deleteCard(cardId: CardIdDto): Promise<void>;
  getCardById(cardId: number): Promise<number>;
}
