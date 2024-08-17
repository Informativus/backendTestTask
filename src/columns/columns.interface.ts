import { ColumnDto } from 'src/Dto/column/column.dto';
import { CreateColumnDto } from 'src/Dto/column/createColumn.dto';
import { ColumnIdDto } from 'src/Dto/column/columnIdDto';

export interface IColumn {
  getAllColumns(userId: number): Promise<ColumnDto[]>;
  createColumn(column: CreateColumnDto): Promise<ColumnIdDto>;
  updateColumnName(column: ColumnDto): Promise<void>;
  deleteColumn(column: ColumnIdDto): Promise<void>;
}
