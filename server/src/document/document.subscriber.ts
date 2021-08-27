import { ActivityService } from 'src/activity/activity.service';
import { ActivityType } from 'src/activity/interface/activity.interface';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';
import { Document } from './document.entity';

@EventSubscriber()
export class DocumentSubscriber implements EntitySubscriberInterface<Document> {
  constructor(
    connection: Connection,
    private readonly activityService: ActivityService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Document;
  }

  afterInsert(event: InsertEvent<Document>) {
    this.activityService.createOne({
      text: `یک آزمایش ایجاد کرد : ${event.entity.name}`,
      type: ActivityType.DOCUMENT,
      user: event.entity.patient,
    });
  }

  afterUpdate(event: RemoveEvent<Document>) {
    this.activityService.createOne({
      text: `یک آزمایش را به روز کرد : ${event.entity.name}`,
      type: ActivityType.DOCUMENT,
      user: event.entity.patient,
    });
  }
}
