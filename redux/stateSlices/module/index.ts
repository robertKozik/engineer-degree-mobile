import { createSlice, isAnyOf, Slice } from "@reduxjs/toolkit";
import initialState, { moduleState } from "./initialState";
import { getAll } from "./thunks";

export const moduleSlice: Slice<moduleState> = createSlice({
  name: "module",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, response) => {
        state.modules = response.payload.data;
      })
      .addMatcher(isAnyOf(getAll.pending), (state) => {})
      .addMatcher(isAnyOf(getAll.rejected), (state, response: any) => {
        console.warn(response);
        console.warn(response.message);
      });
  },
});

export const { select } = moduleSlice.actions;
export { getAll };
export default moduleSlice.reducer;
