import { user } from "../../../interfaces";

interface authState {
  isLoginProcessing: boolean;
  user: user;
}

const initialState: authState = {
  isLoginProcessing: true,
  user: {
    email: "",
    connectedNodes: [],
  },
};

export default initialState;
export { authState };
