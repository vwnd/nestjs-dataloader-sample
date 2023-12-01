import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Post } from './post.entity';
import { PostsService } from './posts.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Resolver(Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [Post], { name: 'posts' })
  getPosts() {
    return this.postsService.getPosts();
  }

  @ResolveField('createdBy', () => User)
  getCreatedBy(@Parent() post: Post) {
    const { userId } = post;
    return this.usersService.getUser(userId);
  }
}
