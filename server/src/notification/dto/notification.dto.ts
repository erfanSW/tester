import {
  NotificationType,
} from '../interface/notification.interface';

export class NotificationDto {
  text: string;
  sender: number;
  receptor: number;
  type: NotificationType;
  notificationElementId: number;

  constructor(text, sender, receptor, type, notificationElementId) {
    this.text = text;
    this.sender = sender;
    this.receptor = receptor;
    this.type = type;
    this.notificationElementId = notificationElementId;
  }
}
