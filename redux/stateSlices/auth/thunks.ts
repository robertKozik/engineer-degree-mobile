import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginPayload, registerPayload } from "../../../interfaces";
import AuthService from "../../../api/services/AuthService";

const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: loginPayload) => {
    const { token } = await AuthService.login(payload);
    const user = await AuthService.fetchUser();
    return { ...user, token };
  }
);

const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: registerPayload, { dispatch }) => {
    await AuthService.register(payload);
    const { email, password } = payload;
    dispatch(loginUser({ email, password }));
  }
);

export { loginUser, registerUser };
