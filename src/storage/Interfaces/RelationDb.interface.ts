import { RelationDbDto } from 'src/Dto/database/database.dto';

export interface IRelationDb {
  sendQuery(query: RelationDbDto): Promise<any>;
}
