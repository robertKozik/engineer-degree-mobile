import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginPayload, registerPayload } from "../../../interfaces";
import AuthService from "../../../api/services/AuthService";

const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: loginPayload) => {
    return await AuthService.login(payload);
  }
);

const fetchUser = createAsyncThunk("auth/get_user", async () => {
  return await AuthService.fetchUser();
});

const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: registerPayload, { dispatch }) => {
    await AuthService.register(payload);
    const { email, password } = payload;
    dispatch(loginUser({ email, password }));
  }
);

export { loginUser, registerUser, fetchUser };
