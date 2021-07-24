import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { DocumentInterface } from "../../interfaces/Document";
import axios from "axios";

const getters: GetterTree<DocumentInterface, StateInterface> = {
  someAction(context) {
    // axios.get("localhost:3000/roles")
    // context.name
  }
};

export default getters;
