import Api from './Api';
import { RequestDto } from 'src/interfaces/User';

export default class Docs {
  static create(request: RequestDto) {
    return Api().post('requests', request);
  }

  static getAll() {
    return Api().get('requests');
  }

  static getByDoc(docId: number) {
    return Api().get(`requests/document/${docId}`);
  }

  static updateState(id: number, state: number) {
    return Api().patch(`requests/${id}/${state}`);
  }

  static getOne(id: string) {
    return Api().get(`documents/${id}`);
  }

  static deleteOne(id: number) {
    return Api().delete(`documents/${id}`);
  }
}
