import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { UserInterface } from "./state";
import User from "../../services/UserService";
import { OtpType } from "src/interfaces/User";

const actions: ActionTree<UserInterface, StateInterface> = {
  register({ commit }, user: UserInterface) {
    return User.register(user);
  },
  signup({ commit }, user: UserInterface) {
    return User.signUp(user);
  },
  validateSignUp({ commit }, user: UserInterface) {
    return User.validateOtp(user, OtpType.SIGNUP);
  },
  validateLogin({ commit }, user: UserInterface) {
    return User.validateOtp(user, OtpType.LOGIN);
  }
};

export default actions;
