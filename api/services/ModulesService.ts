import CoreApi from "../CoreApi";

class ModulesService extends CoreApi {
  constructor(endpoint: string) {
    super();
    this.setEndpointUrl(endpoint);
  }

  getAll(): any {
    return this.api.get("");
  }

  getStatsByModule(
    moduleId: string,
    type?: string,
    from?: string,
    interval?: string
  ): any {
    const typeQuery = type ? `&type=${type}` : "";
    const fromQuery = from ? `from=${from}` : "";
    const intervalQuery = interval ? `&interval=${interval}` : "";
    return this.api.get(
      `/${moduleId}/stats?${fromQuery}${intervalQuery}${typeQuery}`
    );
  }

  changeConfig(id: number, changedConfig: any) {
    return this.api.patch(`/${id}/config`, { config: changedConfig });
  }

  connectToModule(serial_id: string) {
    return this.api.post("/connect", { module_serial_number: serial_id });
  }

  changeModule(changeObj: any, serial: string) {
    return this.api.patch(`/${serial}`, { module: changeObj });
  }
}

const instance = new ModulesService("api/modules");

export default instance;
