import { createSlice, isAnyOf, Slice } from "@reduxjs/toolkit";
import { setToken } from "../../../utils/tokenService";
import initialState, { authState } from "./initialState";
import { loginUser, registerUser, fetchUser } from "./thunks";

export const authSlice: Slice<authState> = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, response) => {
        const { token } = response.payload;
        state.token = token;
        setToken(token);
        state.isLoginProcessing = false;
      })
      .addCase(fetchUser.fulfilled, (state, response: any) => {
        console.log(response.payload);
        state.user.email = response.email;
        state.user.connectedNodes = response?.modules || response?.module;
      })
      .addMatcher(isAnyOf(loginUser.pending, registerUser.pending), (state) => {
        state.isLoginProcessing = true;
      })
      .addMatcher(
        isAnyOf(loginUser.rejected, registerUser.rejected),
        (state, response: any) => {
          console.warn(response);
          state.isLoginProcessing = false;
          console.warn(response.message);
        }
      );
  },
});

export const { select } = authSlice.actions;
export { loginUser, registerUser, fetchUser };
export default authSlice.reducer;
