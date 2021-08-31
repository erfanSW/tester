import { ActivityService } from 'src/activity/activity.service';
import { ActivityType } from 'src/activity/interface/activity.interface';
import { NotificationType } from 'src/notification/interface/notification.interface';
import { NotificationService } from 'src/notification/notification.service';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';
import { Request } from './requests.entity';

@EventSubscriber()
export class RequestSubscriber implements EntitySubscriberInterface<Request> {
  constructor(
    connection: Connection,
    private readonly activityService: ActivityService,
    private readonly notificationService: NotificationService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Request;
  }

  afterInsert(event: InsertEvent<Request>) {
    this.notificationService.createOne({
      sender: event.entity.applicant,
      receptor: event.entity.doctor,
      type: NotificationType.REQUEST,
      notificationElementId: event.entity.id,
      text: `در طی یک درخواست نوشت : ${event.entity.text}` 
    });
    this.activityService.createOne({
      text: `یک درخواست ایجاد کرد : ${event.entity.text}`,
      type: ActivityType.REQUEST,
      user: event.entity.applicant,
    });
  }

  afterUpdate(event: RemoveEvent<Request>) {
    this.activityService.createOne({
      text: `یک درخواست را به روز کرد : ${event.entity.text}`,
      type: ActivityType.REQUEST,
      user: event.entity.applicant,
    });
  }
}
