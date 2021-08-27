import { ActivityService } from 'src/activity/activity.service';
import { ActivityType } from 'src/activity/interface/activity.interface';
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
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Request;
  }

  afterInsert(event: InsertEvent<Request>) {
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
