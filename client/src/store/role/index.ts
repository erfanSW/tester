import { Module } from "vuex";
import { StateInterface } from "../index";
import state, { RoleInterface } from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const roleModule: Module<RoleInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default roleModule;
