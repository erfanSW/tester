import { store } from "quasar/wrappers";
import Vuex from "vuex";

import example from "./module-example";
import role from "./role";
import user from "./user";
import documents from "./document";
import { ExampleStateInterface } from "./module-example/state";
import { RoleInterface } from "./role/state";
import { UserInterface } from "./user/state";
import { DocumentInterface } from "../interfaces/Document";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  example: ExampleStateInterface;
  role: RoleInterface;
  user: UserInterface;
  documents: DocumentInterface;
}

export default store(function({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      example,
      role,
      user,
      documents
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV
  });

  return Store;
});
