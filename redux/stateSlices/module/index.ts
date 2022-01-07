import { createSlice, isAnyOf, Slice } from "@reduxjs/toolkit";
import initialState, { moduleState } from "./initialState";
import {
  changeConfig,
  changeModule,
  connectToModule,
  getAll,
  getModuleStats,
} from "./thunks";

export const moduleSlice: Slice<moduleState> = createSlice({
  name: "module",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, response) => {
        state.modules = response.payload.data;
      })
      .addCase(connectToModule.fulfilled, (state, response) => {
        state.modules = response.payload.data;
      })
      .addCase(changeModule.fulfilled, (state, response) => {
        state.modules = response.payload.data;
      })
      .addCase(getModuleStats.fulfilled, (state, response) => {
        const payload = response.payload.stats;
        const newState = { ...state.statistic };
        const moduleId = response.payload.moduleId;
        if (!moduleId) {
          return;
        }
        newState[moduleId] = payload;

        state.statistic = newState;
      })
      .addCase(changeConfig.fulfilled, (state, response) => {
        const newState = [...state.modules];
        const idx = newState.findIndex(
          (obj) => obj.id === response.payload.moduleId
        );
        const newModuleObj = {
          ...newState[idx],
          config: response.payload.config,
        };
        newState[idx] = newModuleObj;
      })
      .addMatcher(isAnyOf(getAll.pending), () => {})
      .addMatcher(
        isAnyOf(
          getAll.rejected,
          getModuleStats.rejected,
          changeConfig.rejected
        ),
        (state, response: any) => {
          console.warn(response);
          console.warn(response.message);
        }
      );
  },
});

export const { select } = moduleSlice.actions;
export { getAll, getModuleStats };
export default moduleSlice.reducer;
