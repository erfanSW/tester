import { UserInterface } from "src/users/interface/users.interface";

export interface ActivityInterface {
  id: number;
  text: string;
  user: UserInterface;
  type: ActivityType;
}

export enum ActivityType {
  COMMENT = 1,
  DOCUMENT = 2,
  REQUEST = 3,
  AUTHENTICATION = 4,
}
