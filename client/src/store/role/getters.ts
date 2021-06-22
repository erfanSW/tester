import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { RoleInterface } from "./state";
import axios from "axios";

const getters: GetterTree<RoleInterface, StateInterface> = {
  role_list(context) {
    return context.role_list;
  }
};

export default getters;
