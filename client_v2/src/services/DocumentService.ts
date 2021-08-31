import Api from './Api';
import { DocumentDto } from 'src/interfaces/User';

export default class Docs {
  static create(doc: DocumentDto) {
    return Api().post('documents', doc);
  }

  static getAll() {
    return Api().get('documents');
  }

  static getOne(id: string) {
    return Api().get(`documents/${id}`);
  }

  static deleteOne(id: number) {
    return Api().delete(`documents/${id}`);
  }

  static updateTag(id: number, tagId: number) {
    return Api().patch(`documents/${id}/${tagId}`);
  }
}
