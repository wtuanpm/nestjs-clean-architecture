import { UserM } from '../model/user';

export interface UserRepository {
  getUserById(userId: string): Promise<any>;
  getUserByUsername(username: string): Promise<any>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  createUser(username: string, password: string): Promise<UserM>;
}
