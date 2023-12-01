import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Mary' },
    { id: 3, name: 'Elizabeth' },
    { id: 4, name: 'Peter' },
  ];

  private logger = new Logger(UsersService.name);

  async getUsers(): Promise<User[]> {
    return new Promise(async (resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 3000);
    });
  }

  async getUser(id: number): Promise<User> {
    this.logger.debug(`Getting user with id ${id}`);
    return new Promise(async (resolve) => {
      setTimeout(() => {
        resolve(this.users.find((user) => user.id === id));
      }, 2000);
    });
  }
}
