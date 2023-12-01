import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { createUsersLoader } from './users/users.loader';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [UsersModule],
      inject: [UsersService],
      driver: ApolloDriver,
      useFactory: (usersService: UsersService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context: () => ({
          randomValue: Math.random(),
          usersLoader: createUsersLoader(usersService),
        }),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
