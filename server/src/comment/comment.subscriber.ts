import { UseGuards } from '@nestjs/common';
import { ActivityService } from 'src/activity/activity.service';
import { ActivityType } from 'src/activity/interface/activity.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';
import { Comment } from './comment.entity';

@EventSubscriber()
export class CommentSubscriber implements EntitySubscriberInterface<Comment> {
  constructor(
    connection: Connection,
    private readonly activityService: ActivityService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Comment;
  }

  afterInsert(event: InsertEvent<Comment>) {
    this.activityService.createOne({
      text: `کامنت گذاشت : ${event.entity.text}`,
      type: ActivityType.COMMENT,
      user: event.entity.author,
    });
  }
}
