import Api from './Api';

export default class Role {
  static getAll() {
    return Api().get('tag');
  }
}
