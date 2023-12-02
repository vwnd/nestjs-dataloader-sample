import { Injectable, Logger } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  private logger = new Logger(PostsService.name);

  async getPosts(): Promise<Post[]> {
    const qb = this.postsRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Post.createdBy', 'createdBy');
    this.logger.debug(qb.getSql());
    return qb.getMany();
  }
}
