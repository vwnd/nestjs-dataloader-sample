import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Post } from './post.entity';
import { PostsService } from './posts.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as DataLoader from 'dataloader';
import { Logger } from '@nestjs/common';

@Resolver(Post)
export class PostsResolver {
  private readonly logger = new Logger(PostsResolver.name);
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [Post], { name: 'posts' })
  async getPosts() {
    return this.postsService.getPosts();
  }

  @ResolveField('createdBy', () => User)
  async getCreatedBy(
    @Parent() post: Post,
    @Context('usersLoader') usersLoader: DataLoader<number, User>,
  ) {
    const { createdBy } = post;
    return usersLoader.load(createdBy.id);
  }
}
