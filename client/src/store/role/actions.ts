import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { RoleInterface } from "./state";
import Role from "src/services/RoleService";

const actions: ActionTree<RoleInterface, StateInterface> = {
  get_all_roles(context) {
    Role.get_roles().then(res => {
      context.commit("fill_role_list",res.data);
    });
  }
};

export default actions;
