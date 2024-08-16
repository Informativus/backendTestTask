import { config, DotenvParseOutput } from 'dotenv';

export class ConfigService {
  private readonly config: DotenvParseOutput;

  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error(error.message);
    }
    if (!parsed) {
      throw new Error('Failed to parse .env file');
    }
    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];

    if (!res) {
      throw new Error(`Key ${key} not found in .env file`);
    }

    return res;
  }
}
