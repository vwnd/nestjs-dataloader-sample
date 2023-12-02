import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    const qb = this.usersRepository.createQueryBuilder();
    this.logger.debug(qb.getSql());
    return qb.getMany();
  }

  async getUser(id: number): Promise<User> {
    this.logger.debug(`Getting user with id ${id}`);
    const qb = this.usersRepository
      .createQueryBuilder()
      .where({ whereFactory: { id } });
    this.logger.debug(qb.getSql());
    return qb.getOne();
  }

  async getUsersByIds(ids: readonly number[]): Promise<User[]> {
    const qb = this.usersRepository.createQueryBuilder().whereInIds(ids);
    this.logger.debug(qb.getSql());
    return qb.getMany();
  }
}
