import { MutationTree } from "vuex";
import { UserInterface } from "./state";

const mutation: MutationTree<UserInterface> = {
  SetPhone(state: UserInterface, phone: string) {
    state.phone = phone;
  }
};

export default mutation;
