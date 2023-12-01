import * as DataLoader from 'dataloader';
import { UsersService } from './users.service';
import { User } from './user.entity';

function mapFromArray<T>(array: T[], keyStrategy: (v: T) => string | number) {
  const map: Record<string | number, T | undefined> = {};

  for (const item of array) {
    map[keyStrategy(item)] = item;
  }

  return map;
}

export function createUsersLoader(usersService: UsersService) {
  return new DataLoader<number, User>(async (ids) => {
    const users = await usersService.getUsersByIds(ids);

    const usersMap = mapFromArray<User>(users, (user) => user.id);

    return ids.map((id) => usersMap[id]);
  });
}
