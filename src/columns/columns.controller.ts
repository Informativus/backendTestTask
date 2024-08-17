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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ColumnDto } from 'src/Dto/column/column.dto';
import { ColumnIdDto } from 'src/Dto/column/columnIdDto';
import { ColumnNameDto } from 'src/Dto/column/columnName.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/decorators/sessionInfo.decorator';
import { IColumn } from './columns.interface';

@ApiTags('columns')
@Controller('columns')
@UseGuards(AuthGuard)
export class ColumnsController {
  constructor(
    @Inject('IColumn')
    private readonly columnsService: IColumn,
  ) {}

  @Get('all-columns')
  @ApiOkResponse({
    description: 'Возвращает список колонок пользователя или 204',
    type: [ColumnDto],
  })
  async getAllColumns(@SessionInfo('id') userId: number): Promise<ColumnDto[]> {
    return await this.columnsService.getAllColumns(userId);
  }

  @Post('create-columns')
  @ApiCreatedResponse({ type: ColumnNameDto })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createColumn(
    @SessionInfo('id') userId: number,
    @Body() nameDto: ColumnNameDto,
  ): Promise<ColumnIdDto> {
    return await this.columnsService.createColumn({
      userId,
      name: nameDto.name,
    });
  }

  @Patch('update-card-name')
  @ApiOkResponse({
    description: 'Обновляет имя колонки',
    type: [ColumnDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateColumnName(@Body() column: ColumnDto): Promise<void> {
    return await this.columnsService.updateColumnName(column);
  }

  @Delete('delete-column')
  @ApiOkResponse({
    description: 'Удаляет колонку',
    type: [ColumnIdDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteColumn(@Body() column: ColumnIdDto): Promise<void> {
    return await this.columnsService.deleteColumn(column);
  }
}
