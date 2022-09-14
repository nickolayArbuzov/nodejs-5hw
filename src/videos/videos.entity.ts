import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { availableResolutions } from './dto/video.dto';

@Entity('video')
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  title: string;

  @Column({ length: 20 })
  author: string;

  @Column('text', {array: true})
  availableResolutions: availableResolutions[];

  @Column({default: false})
  canBeDownloaded: boolean;

  @Column({ nullable: true })
  minAgeRestriction: number;

  @Column()
  publicationDate: string;

  @Column()
  createdAt: string;
}