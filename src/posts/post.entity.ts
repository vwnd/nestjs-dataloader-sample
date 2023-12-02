import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  body: string;

  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  createdBy?: User;
}
