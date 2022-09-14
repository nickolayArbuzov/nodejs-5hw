import { Post } from '../posts/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('blogger')
export class Blogger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 15 })
  name: string;

  @Column({ length: 100 })
  youtubeUrl: string;

  @Column()
  createdAt: string;

  @OneToMany(() => Post, post => post.blog)
  posts: Post[]

}