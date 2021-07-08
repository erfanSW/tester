import { DocumentInterface } from './Document';

export interface CommentInterface {
  id?: number;
  title: string;
  text: string;
  document: number | DocumentInterface;
  author: number;
}
