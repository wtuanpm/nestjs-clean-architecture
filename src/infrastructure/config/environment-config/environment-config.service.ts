import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { JWTConfig } from '../../../domain/config/jwt.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig {
  constructor(private configService: ConfigService) {}
  getJwtSecret(): string {
    return this.configService.get('JWT_SECRET');
  }
  getJwtExpirationTime(): string {
    return this.configService.get('JWT_EXPIRES_IN');
  }
  getJwtRefreshSecret(): string {
    return this.configService.get('JWT_SECRET_REFRESH_TOKEN');
  }
  getJwtRefreshExpirationTime(): string {
    return this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN');
  }
  getPort(): string {
    return this.configService.get('PORT');
  }
  getMongoUri(): string {
    return this.configService.get('MONGO_URI');
  }
}
