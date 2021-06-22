import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { UserInterface } from "./state";
import axios from "axios";

const getters: GetterTree<UserInterface, StateInterface> = {
  someAction(context) {
    // axios.get("localhost:3000/roles")
    // context.name
  }
};

export default getters;
