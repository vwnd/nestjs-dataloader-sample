import { Injectable, Logger } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 'post-1', title: 'Post 1', body: 'Lorem 1', userId: 1 },
    { id: 'post-2', title: 'Post 2', body: 'Lorem 2', userId: 1 },
    { id: 'post-3', title: 'Post 3', body: 'Lorem 3', userId: 2 },
  ];

  private logger = new Logger(PostsService.name);

  async getPosts(): Promise<Post[]> {
    this.logger.debug('Getting posts');
    return new Promise(async (resolve) => {
      setTimeout(() => {
        resolve(this.posts);
      }, 3000);
    });
  }
}
