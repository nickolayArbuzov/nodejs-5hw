import { forwardRef, Module } from '@nestjs/common';
import { BloggerModule } from '../blogger/blogger.module';
import { DatabaseModule } from '../database/database.module';
import { PostController } from './post.controller';
import { postProviders } from './post.providers';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  imports: [DatabaseModule, forwardRef(() => BloggerModule)],
  providers: [
    ...postProviders,
    PostService,
  ],
  exports: [PostService, postProviders.find(p => p.provide === 'POST_REPOSITORY')],
})
export class PostModule {}