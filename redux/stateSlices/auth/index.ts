import { createSlice, isAnyOf, Slice } from "@reduxjs/toolkit";
import initialState, { authState } from "./initialState";
import { loginUser, registerUser } from "./thunks";

export const authSlice: Slice<authState> = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, response) => {
        state.user = response.payload;
        state.isLoginProcessing = false;
      })
      .addMatcher(isAnyOf(loginUser.pending, registerUser.pending), (state) => {
        state.isLoginProcessing = true;
      })
      .addMatcher(
        isAnyOf(loginUser.rejected, registerUser.rejected),
        (state) => {
          state.isLoginProcessing = false;
          console.warn("request error");
        }
      );
  },
});

export const { select } = authSlice.actions;
export { loginUser, registerUser };
export default authSlice.reducer;
