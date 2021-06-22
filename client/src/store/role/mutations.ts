import { MutationTree } from "vuex";
import { RoleInterface } from "./state";

const mutation: MutationTree<RoleInterface> = {
  fill_role_list(state: RoleInterface, role_list: RoleInterface[]) {
    state.role_list = role_list;
  }
};

export default mutation;
