import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IComments } from './comments.interface';
import { CardIdDto } from 'src/Dto/cards/cardId.dto';
import { CommentDto } from 'src/Dto/comments/comment.dto';
import { CommentIdDto } from 'src/Dto/comments/commentId.dto';
import { CreateCommentsDto } from 'src/Dto/comments/createComments.dto';
import { ICommentsGateway } from './commentsGateway/commentsGateway.interface';
import { ICard } from 'src/cards/card.interface';

@Injectable()
export class CommentsService implements IComments {
  constructor(
    @Inject('ICommentsGateway')
    private readonly commentsGateway: ICommentsGateway,
    @Inject('ICard')
    private readonly cardService: ICard,
  ) {}
  async getCommentsByCardId(cardId: CardIdDto): Promise<CommentDto[]> {
    if (!(await this.cardService.isExistsCard(cardId.id))) {
      throw new BadRequestException('card not found');
    }
    const comments: CommentDto[] =
      await this.commentsGateway.getCommentsByCardId(cardId);

    if (comments.length === 0) {
      throw new HttpException('No cards found', HttpStatus.NO_CONTENT);
    }

    return comments;
  }

  async createComment(createComment: CreateCommentsDto): Promise<CommentIdDto> {
    if (!(await this.cardService.isExistsCard(createComment.cardId))) {
      throw new BadRequestException('card not found');
    }
    const commentIds: CommentIdDto[] =
      await this.commentsGateway.createComment(createComment);

    if (commentIds.length === 0) {
      throw new InternalServerErrorException('Failed to create comment');
    }

    return commentIds[0];
  }

  async updateCommentName(comment: CommentDto): Promise<void> {
    if (await this.isExistsCommnets(comment.id)) {
      await this.commentsGateway.updateCommentName(comment);
    } else {
      throw new BadRequestException('Comment not found');
    }
  }

  async deleteComment(commentId: CommentIdDto): Promise<void> {
    if (await this.isExistsCommnets(commentId.id)) {
      return this.commentsGateway.deleteComment(commentId);
    } else {
      throw new BadRequestException('Comment not found');
    }
  }

  private async isExistsCommnets(commentId: number): Promise<boolean> {
    const commentCount: number =
      await this.commentsGateway.getCommentById(commentId);
    return commentCount > 0;
  }
}
