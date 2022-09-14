import { Module, forwardRef } from '@nestjs/common';
import { AllDataController } from './all-data.controller';
import { AllDataService } from './all-data.service';
import { VideoModule } from '../videos/videos.module';
import { BloggerModule } from '../blogger/blogger.module';
import { PostModule } from '../posts/post.module';
import { UserModule } from '../users/user.module';

@Module({
  controllers: [AllDataController],
  imports: [VideoModule, BloggerModule, PostModule, UserModule],
  providers: [
    AllDataService,
  ],
})
export class AllDataModule {}
