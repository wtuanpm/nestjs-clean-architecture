import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserM } from 'src/domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userRepo: Model<UserDocument>,
  ) {}

  async getUserById(userId: string): Promise<any> {
    const user = await this.userRepo.findOne({ _id: userId }).lean();
    return user;
  }

  async createUser(username: string, password: string): Promise<UserM> {
    const created = await this.userRepo.create({
      username,
      password,
    });

    return created as any;
  }

  async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepo.update(
      {
        username: username,
      },
      { hach_refresh_token: refreshToken },
    );
  }
  async getUserByUsername(username: string) {
    const user = await this.userRepo.findOne({ username }).lean();

    return user;
  }
  async updateLastLogin(username: string): Promise<void> {
    await this.userRepo.update(
      {
        username: username,
      },
      { last_login: () => 'CURRENT_TIMESTAMP' },
    );
  }
}
