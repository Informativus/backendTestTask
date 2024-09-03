import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IColumnGateway } from './columnGateway/columnGateway.interface';
import { IColumn } from './columns.interface';
import { ColumnDto } from 'src/Dto/column/column.dto';
import { CreateColumnDto } from 'src/Dto/column/createColumn.dto';
import { ColumnIdDto } from 'src/Dto/column/columnIdDto';

@Injectable()
export class ColumnsService implements IColumn {
  constructor(
    @Inject('IColumnGateway')
    private readonly columnGateway: IColumnGateway,
  ) {}
  async getAllColumns(email: string): Promise<ColumnDto[]> {
    const columns: ColumnDto[] = await this.columnGateway.getAllColumns(email);

    if (columns.length === 0) {
      throw new HttpException('No columns found', HttpStatus.NO_CONTENT);
    }

    return columns;
  }

  async createColumn(column: CreateColumnDto): Promise<ColumnIdDto> {
    const columnIds: ColumnIdDto[] =
      await this.columnGateway.createColumn(column);

    if (columnIds.length === 0) {
      throw new InternalServerErrorException('Failed to create column');
    }

    return columnIds[0];
  }

  async updateColumnName(column: ColumnDto): Promise<void> {
    if (await this.isExistsColumn(column.id)) {
      await this.columnGateway.updateColumnName(column);
    } else {
      throw new BadRequestException('Column not found');
    }
  }

  async deleteColumn(column: ColumnIdDto): Promise<void> {
    if (await this.isExistsColumn(column.id)) {
      return this.columnGateway.deleteColumn(column);
    } else {
      throw new BadRequestException('Column not found');
    }
  }

  async isExistsColumn(columnId: number): Promise<boolean> {
    const columnCount: number =
      await this.columnGateway.getColumnById(columnId);
    return columnCount > 0;
  }
}
