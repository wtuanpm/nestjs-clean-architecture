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

export class AuthUsecase {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly eConfigService: EnvironmentConfigService,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly dateUtils: DateUtils,
  ) {}

  async register(param: {
    username: string;
    password: string;
  }): Promise<AuthPayload> {
    const { username, password } = param;
    const hashedPassword = await this.bcryptService.hash(password);
    const user = await this.userRepository.getUserByUsername(username);
    if (user) {
      throw new BadRequestException('Email is already in use');
    }

    const newUser = await this.userRepository.createUser(
      username,
      hashedPassword,
    );

    const { expiresAt: tokenExpiresAt, token } =
      await this.getAuthenticationToken(
        {
          username: newUser.username,
        },
        this.eConfigService.getJwtExpirationTime(),
      );

    const { expiresAt: refreshTokenExpiresAt, token: refreshToken } =
      await this.getAuthenticationToken(
        {
          username: newUser.username,
        },
        this.eConfigService.getJwtRefreshExpirationTime(),
      );

    const result = {
      token,
      tokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      userId: newUser.id,
      username: newUser.username,
    };
    return result;
  }

  async login(user: UserM): Promise<AuthPayload> {
    const { expiresAt: tokenExpiresAt, token } =
      await this.getAuthenticationToken(
        {
          username: user.username,
        },
        this.eConfigService.getJwtExpirationTime(),
      );

    const { expiresAt: refreshTokenExpiresAt, token: refreshToken } =
      await this.getAuthenticationToken(
        {
          username: user.username,
        },
        this.eConfigService.getJwtRefreshExpirationTime(),
      );

    const result = {
      token,
      tokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      userId: user._id.toString(),
      username: user.username,
    };
    return result;
  }

  private async getAuthenticationToken(
    payload: IJwtServicePayload,
    expiration: string,
  ) {
    const expiresAt = this.dateUtils.getDateFromDurationString(expiration);
    return {
      token: this.jwtTokenService.createToken(
        payload,
        this.eConfigService.getJwtSecret(),
        expiration,
      ),
      expiresAt,
    };
  }
}
