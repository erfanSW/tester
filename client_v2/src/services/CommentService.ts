import Api from './Api';
import { CommentInterface } from 'src/interfaces/Comment';

export default class Comment {
  static create(comment: CommentInterface) {
    return Api().post('comments', comment);
  }

  static getAll() {
    return Api().get('comments');
  }

  static getOne(docId: string) {
    return Api().get(`comments/${docId}`);
  }

  static deleteOne(id: number) {
    return Api().delete(`comments/${id}`);
  }
}
