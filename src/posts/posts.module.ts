import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Post])],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
