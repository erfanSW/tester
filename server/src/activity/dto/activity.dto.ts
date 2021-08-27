import { ActivityType } from '../interface/activity.interface';

export class ActivityDto {
  text: string;
  user: number;
  type: ActivityType;

  constructor(text, user, type) {
    this.text = text;
    this.user = user;
    this.type = type;
  }
}
