import { DataSource } from 'typeorm';
import { Blogger } from '../blogger/blogger.entity';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { Video } from '../videos/videos.entity';
import { Contact } from '../test/contact.entity';
import { Employee } from '../test/employee.entity';
import { Meeting } from '../test/meeting.entity';
import { Task } from '../test/task.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASS,
        database: process.env.POSTGRES_DB,
        entities: [Blogger, User, Post, Comment, Video, Contact, Employee, Meeting, Task],
        synchronize: true,
        ssl: {rejectUnauthorized: false}
      });

      return dataSource.initialize();
    },
  },
];