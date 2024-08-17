import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ICommentsGateway } from './commentsGateway.interface';
import { IRelationDb } from 'src/storage/Interfaces/RelationDb.interface';
import { CardIdDto } from 'src/Dto/cards/cardId.dto';
import { CommentDto } from 'src/Dto/comments/comment.dto';
import { validateAndMapDto } from 'src/utils/validateAndMapDto.util';
import { CreateCommentsDto } from 'src/Dto/comments/createComments.dto';
import { CommentIdDto } from 'src/Dto/comments/commentId.dto';

@Injectable()
export class CommentsGatewayService implements ICommentsGateway {
  constructor(
    @Inject('IRelationDb')
    private readonly relationDb: IRelationDb,
  ) {}

  async getCommentsByCardId(cardId: CardIdDto): Promise<CommentDto[]> {
    try {
      const cards = await this.relationDb.sendQuery({
        text: 'SELECT id, name FROM comments WHERE card_id = $1',
        values: [cardId.id],
      });

      return validateAndMapDto(
        cards.map((comment) => {
          return {
            id: comment.id,
            name: comment.name,
          };
        }),
        CommentDto,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to get comments by column id',
      );
    }
  }

  async createComment(
    createComment: CreateCommentsDto,
  ): Promise<CommentIdDto[]> {
    try {
      const cardIds: CardIdDto[] = await this.relationDb.sendQuery({
        text: 'INSERT INTO comments (card_id, name) VALUES ($1, $2) RETURNING id',
        values: [createComment.cardId, createComment.name],
      });

      return validateAndMapDto(
        cardIds.map((commentId) => {
          return {
            id: commentId.id,
          };
        }),
        CommentIdDto,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create comment');
    }
  }

  async updateCommentName(comment: CommentDto): Promise<void> {
    try {
      await this.relationDb.sendQuery({
        text: 'UPDATE comments SET name = $1 WHERE id = $2',
        values: [comment.name, comment.id],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update comment name');
    }
  }

  async deleteComment(commentId: CommentIdDto): Promise<void> {
    try {
      await this.relationDb.sendQuery({
        text: 'DELETE FROM comments WHERE id = $1',
        values: [commentId.id],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to delete comment');
    }
  }

  async getCommentById(commentId: number): Promise<number> {
    try {
      const data = await this.relationDb.sendQuery({
        text: 'SELECT COUNT(*) FROM comments WHERE id = $1',
        values: [commentId],
      });
      return data[0].count;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Failed to get comment count by id',
      );
    }
  }
}
