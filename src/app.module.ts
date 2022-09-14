import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BloggerModule } from './blogger/blogger.module';
import { PostModule } from './posts/post.module';
import { CommentModule } from './comments/comment.module';
import { UserModule } from './users/user.module';
import { VideoModule } from './videos/videos.module';
import { Contact } from './test/contact.entity';
import { Employee } from './test/employee.entity';
import { Meeting } from './test/meeting.entity';
import { Task } from './test/task.entity';
import { AllDataModule } from './all-data/all-data.module';
import { LoggerMiddleware } from './middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', 
      isGlobal: true,
    }),
    DatabaseModule,
    BloggerModule,
    PostModule,
    CommentModule,
    UserModule,
    VideoModule,
    AllDataModule,
    AuthModule,
  ],
})
export class AppModule {}
/*export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({path: 'posts', method: RequestMethod.POST}, {path: 'posts', method: RequestMethod.PUT})
  }
}*/

