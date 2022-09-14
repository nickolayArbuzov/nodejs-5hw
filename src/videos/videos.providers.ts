import { DataSource } from 'typeorm';
import { Video } from './videos.entity';

export const videoProviders = [
  {
    provide: 'VIDEO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Video),
    inject: ['DATA_SOURCE'],
  },
];