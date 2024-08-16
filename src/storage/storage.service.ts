import { Inject, Injectable } from '@nestjs/common';
import { IRelationDb } from './Interfaces/RelationDb.interface';
import { ConfigService } from 'src/config/config.service';
import { Pool } from 'pg';
import { RelationDbDto } from 'src/Dto/database/database.dto';

@Injectable()
export class RelationDbService implements IRelationDb {
  private pool: Pool;

  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {
    this.pool = new Pool({
      user: this.config.get('PSQL_USER'),
      password: this.config.get('PSQL_PASSWORD'),
      host: this.config.get('PSQL_HOST'),
      port: Number(this.config.get('PSQL_PORT')),
      database: this.config.get('PSQL_DATABASE'),
    });
  }

  async sendQuery(query: RelationDbDto): Promise<any> {
    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (err) {
      throw new Error(`Database query failed: ${err.message}`);
    }
  }
}
