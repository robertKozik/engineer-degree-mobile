import { createAsyncThunk } from "@reduxjs/toolkit";
import ModulesService from "../../../api/services/ModulesService";

const getAll = createAsyncThunk("modules/getAll", async () => {
  return await ModulesService.getAll();
});

const getModuleStats = createAsyncThunk(
  "modules/getModuleStats",
  async (payload: {
    type?: string;
    interval?: string;
    from?: string;
    moduleId: string;
    module_db: number;
  }) => {
    const stats = await ModulesService.getStatsByModule(
      payload.moduleId,
      payload.type,
      payload.from,
      payload.interval
    );
    return { stats, moduleId: payload.module_db };
  }
);

const changeConfig = createAsyncThunk(
  "modules/changeConfig",
  async ({ moduleId, config }: { moduleId: number; config: Object }) => {
    const changedConfig = await ModulesService.changeConfig(moduleId, config);
    return {
      config: changedConfig,
      moduleId,
    };
  }
);

const connectToModule = createAsyncThunk(
  "modules/connect",
  async ({ serial_number }: { serial_number: string }) => {
    await ModulesService.connectToModule(serial_number);
    return await ModulesService.getAll();
  }
);

const changeModule = createAsyncThunk(
  "modules/change",
  async ({ serial, changeset }: any) => {
    await ModulesService.changeModule(changeset, serial);
    return await ModulesService.getAll();
  }
);

export { getAll, getModuleStats, changeConfig, connectToModule, changeModule };
