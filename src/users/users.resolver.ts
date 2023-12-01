import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users() {
    return this.usersService.getUsers();
  }
}
