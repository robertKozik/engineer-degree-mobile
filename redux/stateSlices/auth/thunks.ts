import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginPayload, registerPayload } from "../../../interfaces";
import AuthService from "../../../api/services/authService";
import { setToken } from "../../../utils/tokenService";

const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: loginPayload) => {
    const { token } = await AuthService.login(payload);
    setToken(token);
    const user = await AuthService.fetchUser();
    return user;
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
