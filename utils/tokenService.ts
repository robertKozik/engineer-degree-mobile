/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as SecureStore from "expo-secure-store";

export async function getToken(): string {
  const token = await SecureStore.getItemAsync("token");
  return token || "";
}

export async function setToken(token: string): Promise<void> {
  return await SecureStore.setItemAsync("token", token);
}

export async function removeToken(): Promise<void> {
  return await SecureStore.deleteItemAsync("token");
}
