import Api from './Api';
import { CommentDto } from 'src/interfaces/User';

export default class Comment {
  static create(comment: CommentDto) {
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
