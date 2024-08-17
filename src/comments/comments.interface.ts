import { CardIdDto } from 'src/Dto/cards/cardId.dto';
import { CommentDto } from 'src/Dto/comments/comment.dto';
import { CommentIdDto } from 'src/Dto/comments/commentId.dto';
import { CreateCommentsDto } from 'src/Dto/comments/createComments.dto';

export interface IComments {
  getCommentsByCardId(cardId: CardIdDto): Promise<CommentDto[]>;
  createComment(createComment: CreateCommentsDto): Promise<CommentIdDto>;
  updateCommentName(comment: CommentDto): Promise<void>;
  deleteComment(commentId: CommentIdDto): Promise<void>;
}
