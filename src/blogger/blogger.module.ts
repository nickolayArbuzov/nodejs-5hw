import { forwardRef, Module } from '@nestjs/common';
import { PostModule } from '../posts/post.module';
import { PostService } from '../posts/post.service';
import { DatabaseModule } from '../database/database.module';
import { BloggerController } from './blogger.controller';
import { bloggerProviders } from './blogger.providers';
import { BloggerService } from './blogger.service';
import { PostController } from 'src/posts/post.controller';
import { BlogIsExistRule } from './customValidate';


@Module({
  controllers: [BloggerController],
  imports: [DatabaseModule, forwardRef(() => PostModule)],
  providers: [
    ...bloggerProviders,
    BloggerService,
    BlogIsExistRule,
  ],
  exports: [BloggerService, bloggerProviders.find(b => b.provide==='BLOGGER_REPOSITORY')],
})
export class BloggerModule {}