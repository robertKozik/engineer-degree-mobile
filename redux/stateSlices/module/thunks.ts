import { createAsyncThunk } from "@reduxjs/toolkit";
import ModulesService from "../../../api/services/ModulesService";

const getAll = createAsyncThunk("modules/getAll", async () => {
  return await ModulesService.getAll();
});

export { getAll };
