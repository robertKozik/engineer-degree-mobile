import { informationNode } from "../../../interfaces";

interface moduleState {
  modules: Array<informationNode>;
}

const initialState: moduleState = {
  modules: [],
};

export default initialState;
export { moduleState };
