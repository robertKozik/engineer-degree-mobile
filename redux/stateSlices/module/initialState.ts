import { informationNode } from "../../../interfaces";
// import statEntry from "../../../interfaces/statEntry";

interface moduleState {
  modules: Array<informationNode>;
  statistic: any;
  isFetching: boolean;
}

const initialState: moduleState = {
  modules: [],
  statistic: {},
  isFetching: false,
};

export default initialState;
export { moduleState };
