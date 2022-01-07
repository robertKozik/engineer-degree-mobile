import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./stateSlices/auth";
import moduleSlice from "./stateSlices/module";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modules: moduleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
