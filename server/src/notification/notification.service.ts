import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  createOne(notification: NotificationDto) {
    return this.notificationRepository.save(notification);
  }

  getUnseenList(userId) {
    return this.notificationRepository.find({
      where: { receptor: userId, seen: false },
      order: { created_at: 'DESC' },
    });
  }

  getAll(userId) {
    return this.notificationRepository.find({
      where: { receptor: userId },
      order: { created_at: 'DESC' },
    });
  }

  deleteOne(id: number) {
    return this.notificationRepository.delete({ id });
  }

  seenNotification(id: number) {
    return this.notificationRepository.update(id, { seen: true });
  }
}
