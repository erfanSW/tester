import { stat } from "fs";
import { MutationTree } from "vuex";
import { ExampleStateInterface } from "./state";

const mutation: MutationTree<ExampleStateInterface> = {
  updateProgress(state: ExampleStateInterface, value: number) {
    state.progress = value;
  }
};

export default mutation;
