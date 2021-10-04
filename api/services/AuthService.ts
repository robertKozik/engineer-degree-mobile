import {
  loginPayload,
  loginResponse,
  registerPayload,
  user,
} from "../../interfaces";
import CoreApi from "../CoreApi";

class AuthService extends CoreApi {
  constructor(endpoint: string) {
    super(endpoint);
  }

  login({ email, password }: loginPayload): Promise<loginResponse> {
    //TODO login
    throw { email, password };
  }

  register({ email, password, username }: registerPayload): Promise<any> {
    //TODO register
    throw { email, password, username };
  }

  fetchUser(): Promise<user> {
    //TODO fetch user
    throw {
      email: "email",
      connectedNodes: [],
    };
  }
}

const instance = new AuthService("/auth");

export default instance;
