import CoreApi from "../CoreApi";

class ModulesService extends CoreApi {
  constructor(endpoint: string) {
    super();
    this.setEndpointUrl(endpoint);
  }

  getAll(): any {
    return this.api.get("modules");
  }
}

const instance = new ModulesService("api/");

export default instance;
