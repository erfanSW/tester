import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { DocumentInterface } from "../../interfaces/Document";
import Document from "../../services/DocumentService";

const actions: ActionTree<DocumentInterface, StateInterface> = {
  create({ commit }, document: DocumentInterface) {
    return Document.create(document);
  },
  getAll({ commit }) {
    return Document.getAll();
  }
};

export default actions;
