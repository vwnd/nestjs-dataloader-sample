import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
