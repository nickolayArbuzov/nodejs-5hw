import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  login: string;

  @Column({ length: 20 })
  password: string;

  @Column('text')
  email: string;

  @Column()
  createdAt: string;

}