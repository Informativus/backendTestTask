import { ColumnDto } from 'src/Dto/column/column.dto';
import { CreateColumnDto } from 'src/Dto/column/createColumn.dto';
import { ColumnIdDto } from 'src/Dto/column/columnIdDto';
import { IColumnGateway } from './columnGateway.interface';
import { IRelationDb } from 'src/storage/Interfaces/RelationDb.interface';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { validateAndMapDto } from 'src/utils/validateAndMapDto.util';

export class ColumnGateway implements IColumnGateway {
  constructor(
    @Inject('IRelationDb')
    private readonly relationDb: IRelationDb,
  ) {}
  async getAllColumns(userId: number): Promise<ColumnDto[]> {
    const columns = await this.relationDb.sendQuery({
      text: 'SELECT id, name FROM columns WHERE user_id = $1',
      values: [userId],
    });

    return validateAndMapDto(
      columns.map((column) => {
        return {
          id: column.id,
          name: column.name,
        };
      }),
      ColumnDto,
    );
  }

  async createColumn(column: CreateColumnDto): Promise<ColumnIdDto[]> {
    const columnIds: ColumnIdDto[] = await this.relationDb.sendQuery({
      text: 'INSERT INTO columns (user_id, name) VALUES ($1, $2) RETURNING id',
      values: [column.userId, column.name],
    });

    return validateAndMapDto(
      columnIds.map((columnId) => {
        return {
          id: columnId.id,
        };
      }),
      ColumnIdDto,
    );
  }

  async updateColumnName(column: ColumnDto): Promise<void> {
    await this.relationDb.sendQuery({
      text: 'UPDATE columns SET name = $1 WHERE id = $2',
      values: [column.name, column.id],
    });
  }

  async deleteColumn(column: ColumnIdDto): Promise<void> {
    try {
      await this.relationDb.sendQuery({
        text: 'DELETE FROM columns WHERE id = $1',
        values: [column.id],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to delete column');
    }
  }

  async getColumnById(columnId: number): Promise<number> {
    try {
      const data = await this.relationDb.sendQuery({
        text: 'SELECT COUNT(*) FROM columns WHERE id = $1',
        values: [columnId],
      });
      return data[0].count;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to get column by id');
    }
  }
}
