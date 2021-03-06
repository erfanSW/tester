import Api from "./Api";
import { DocumentInterface } from "src/interfaces/Document";

export default class Docs {
  static create(doc: DocumentInterface) {
    return Api().post("documents", doc);
  }

  static getAll() {
    return Api().get("documents");
  }

  static deleteOne(id: number) {
    return Api().delete("documents/" + id);
  }
}
