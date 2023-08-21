import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoConfigService {
  constructor(private configService: ConfigService) {}

  getUri(): string {
    const username = this.configService.get('MONGO_LOGIN');
    const password = this.configService.get('MONGO_PASSWORD');
    const host = this.configService.get('MONGO_HOST');
    const port = this.configService.get('MONGO_PORT');
    const database = this.configService.get('MONGO_AUTH_DB');

    return `mongodb://${username}:${password}@${host}:${port}/${database}`;
  }
}
