import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CardDto } from 'src/Dto/cards/card.dto';
import { CardIdDto } from 'src/Dto/cards/cardId.dto';
import { CardNameDto } from 'src/Dto/cards/cardName.dto';
import { CreateCardDto } from 'src/Dto/cards/createCard.dto';
import { ColumnIdDto } from 'src/Dto/column/columnIdDto';
import { ICard } from './card.interface';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(
    @Inject('ICard')
    private readonly cardsService: ICard,
  ) {}
  @Get('all-column-cards')
  @ApiOkResponse({
    description: 'Возвращает список карточек пользователя или 204',
    type: [ColumnIdDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getCardsByColumnId(@Query() columnId: ColumnIdDto): Promise<CardDto[]> {
    return await this.cardsService.getCardsByColumnId(columnId);
  }

  @Post('create-card')
  @ApiCreatedResponse({ type: CardNameDto })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCard(@Body() createCard: CreateCardDto): Promise<CardIdDto> {
    return await this.cardsService.createCard(createCard);
  }

  @Patch('update-card-name')
  @ApiOkResponse({
    description: 'Обновляет имя карточки',
    type: [CardDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateCardName(@Body() card: CardDto): Promise<void> {
    return await this.cardsService.updateCardName(card);
  }

  @Delete('delete-card')
  @ApiOkResponse({
    description: 'Удаляет карточку',
    type: [CardIdDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteCard(@Body() cardId: CardIdDto): Promise<void> {
    return await this.cardsService.deleteCard(cardId);
  }
}
