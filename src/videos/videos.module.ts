import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { VideoController } from './videos.controller';
import { videoProviders } from './videos.providers';
import { VideoService } from './videos.service';

@Module({
  controllers: [VideoController],
  imports: [DatabaseModule],
  providers: [
    ...videoProviders,
    VideoService,
  ],
  exports: [VideoService, videoProviders.find(v => v.provide === 'VIDEO_REPOSITORY')]
})
export class VideoModule {}