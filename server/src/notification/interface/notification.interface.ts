import { UserInterface } from "src/users/interface/users.interface";

export interface NotificationInterface {
  id: number;
  text: string;
  user: UserInterface;
  type: NotificationType;
  entityId: number;
  seen: false;
}

export enum NotificationType {
  COMMENT = 1,
  DOCUMENT = 2,
  REQUEST = 3,
  AUTHENTICATION = 4,
}
