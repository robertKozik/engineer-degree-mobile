import axios from "axios";
import {
  loginPayload,
  loginResponse,
  registerPayload,
  user,
} from "../../interfaces";
import CoreApi from "../CoreApi";

class AuthService extends CoreApi {
  constructor(endpoint: string) {
    super();
    this.setEndpointUrl(endpoint);
  }

  login(payload: loginPayload): any {
    return this.api.post("login", payload);
    // return axios.post('http://192.168.0.102:4000/api/login', payload);
  }

  register({ email, password, username }: registerPayload): Promise<any> {
    //TODO register
    throw { email, password, username };
  }

  fetchUser(): any {
    return this.api.get("users");
  }
}

const instance = new AuthService("api/");

export default instance;
