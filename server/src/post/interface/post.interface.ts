import { UserInterface } from 'src/users/interface/users.interface';

export interface PostInterface {
  id: number;
  text: string;
  user: UserInterface;
}
