import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: UserRepository) {}

  async execute(username: string): Promise<UserM> {
    const user: UserM = await this.adminUserRepo.getUserByUsername(username);
    return user;
  }
}
