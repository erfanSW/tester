import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CommentController } from './comment.controller';
import { ActivityModule } from 'src/activity/activity.module';
import { CommentSubscriber } from './comment.subscriber';
import { DocumentModule } from 'src/document/document.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    ActivityModule,
    DocumentModule,
    NotificationModule
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentSubscriber],
})
export class CommentModule {}
