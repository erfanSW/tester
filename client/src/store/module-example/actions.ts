import { values } from "lodash";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { ExampleStateInterface } from "./state";

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  updateProgress({ commit }, payload: number) {
    commit("updateProgress", payload);
  }
};

export default actions;
