import { ColumnDto } from 'src/Dto/column/column.dto';
import { CreateColumnDto } from 'src/Dto/column/createColumn.dto';
import { ColumnIdDto } from 'src/Dto/column/columnIdDto';

export interface IColumn {
  getAllColumns(email: string): Promise<ColumnDto[]>;
  createColumn(column: CreateColumnDto): Promise<ColumnIdDto>;
  updateColumnName(column: ColumnDto): Promise<void>;
  deleteColumn(column: ColumnIdDto): Promise<void>;
  isExistsColumn(columnId: number): Promise<boolean>;
}
