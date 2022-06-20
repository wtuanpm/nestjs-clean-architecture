import { BadRequestException } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import {
  IJwtService,
  IJwtServicePayload,
} from 'src/domain/adapters/jwt.interface';
import { ILogger } from 'src/domain/logger/logger.interface';
import { AuthPayload } from 'src/domain/model/auth';
import { UserM } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
import { DateUtils } from 'src/infrastructure/services/utils/date.utils';

export class UserUsecase {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly eConfigService: EnvironmentConfigService,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly dateUtils: DateUtils,
  ) {}

  async getUserById(userId: any) {
    const { password, ...user } = await this.userRepository.getUserById(userId);
    return user;
  }
}
