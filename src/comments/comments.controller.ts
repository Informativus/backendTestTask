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
import { CardIdDto } from 'src/Dto/cards/cardId.dto';
import { CommentDto } from 'src/Dto/comments/comment.dto';
import { CommentIdDto } from 'src/Dto/comments/commentId.dto';
import { CreateCommentsDto } from 'src/Dto/comments/createComments.dto';
import { IComments } from './comments.interface';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    @Inject('IComments')
    private readonly commentsService: IComments,
  ) {}

  @Get('all-card-comments')
  @ApiOkResponse({
    description:
      'Возвращает список комментариев к карточке по ID карточки или 204',
    type: [CardIdDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getCommentsByCardId(@Query() cardId: CardIdDto): Promise<CommentDto[]> {
    return await this.commentsService.getCommentsByCardId(cardId);
  }

  @Post('create-comment')
  @ApiCreatedResponse({ type: CreateCommentsDto })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createComment(
    @Body() createComment: CreateCommentsDto,
  ): Promise<CommentIdDto> {
    return await this.commentsService.createComment(createComment);
  }

  @Patch('update-comment-name')
  @ApiOkResponse({
    description: 'Обновляет имя комментария',
    type: [CommentDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateCommentName(@Body() comment: CommentDto): Promise<void> {
    return await this.commentsService.updateCommentName(comment);
  }

  @Delete('delete-card')
  @ApiOkResponse({
    description: 'Удаляет комментарий',
    type: [CommentIdDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteComment(@Body() commentId: CommentIdDto): Promise<void> {
    return await this.commentsService.deleteComment(commentId);
  }
}
