import { Module } from "vuex";
import { StateInterface } from "../index";
import state, { UserInterface } from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const userModule: Module<UserInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default userModule;
