import { DataSource } from 'typeorm';
import { Blogger } from './blogger.entity';

export const bloggerProviders = [
  {
    provide: 'BLOGGER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Blogger),
    inject: ['DATA_SOURCE'],
  },
];