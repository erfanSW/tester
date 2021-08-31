import { UseGuards } from '@nestjs/common';
import { ActivityService } from 'src/activity/activity.service';
import { ActivityType } from 'src/activity/interface/activity.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DocumentService } from 'src/document/document.service';
import { NotificationType } from 'src/notification/interface/notification.interface';
import { NotificationService } from 'src/notification/notification.service';
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
    private readonly documentService: DocumentService,
    private readonly notificationService: NotificationService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Comment;
  }

  async afterInsert(event: InsertEvent<Comment>) {
    const doc = await this.documentService.findById(event.entity.document);

    if (doc.doctor) {
      const receptorId =
        doc.patient === event.entity.author ? doc.doctor : doc.patient;
      console.log(doc)
      this.notificationService.createOne({
        notificationElementId: event.entity.document,
        text: 'کامنت گذاشت : ' + event.entity.text,
        type: NotificationType.COMMENT,
        sender: event.entity.author,
        receptor: receptorId,
      });
    }

    this.activityService.createOne({
      text: `کامنت گذاشت : ${event.entity.text}`,
      type: ActivityType.COMMENT,
      user: event.entity.author,
    });
  }
}
