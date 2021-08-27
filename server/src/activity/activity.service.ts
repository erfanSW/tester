import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { ActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  createOne(activity: ActivityDto) {
    return this.activityRepository.save(activity);
  }

  getAll(userId) {
    return this.activityRepository.find({
      where: { user: { id: userId } },
      order: { created_at: 'DESC' },
    });
  }

  deleteOne(id: number) {
    return this.activityRepository.delete({ id });
  }
}
