import Api from "./Api";

export default class Role {
  static get_roles() {
    return Api().get("roles");
  }
}
