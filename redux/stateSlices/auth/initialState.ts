import { user } from "../../../interfaces";

interface authState {
  isLoginProcessing: boolean;
  user: user;
  token: string;
}

const initialState: authState = {
  isLoginProcessing: false,
  user: {
    email: "",
    connectedNodes: [],
  },
  token: "",
};

export default initialState;
export { authState };
