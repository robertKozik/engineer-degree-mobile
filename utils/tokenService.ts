import Cookies from "universal-cookie/es6";
import cookieNames from "../constants/cookieNames";

const cookies = new Cookies();

export function getToken(): string {
  return cookies.get(cookieNames.token);
}

export function setToken(token?: string): void {
  return cookies.set(cookieNames.token, token, { path: "/" });
}

export function removeToken(): void {
  return cookies.remove(cookieNames.token);
}

export function getRefreshToken(): string {
  return cookies.get(cookieNames.refreshToken);
}

export function setRefreshToken(token?: string) {
  return cookies.set(cookieNames.refreshToken, token, { path: "/" });
}

export function removeRefreshToken(): void {
  return cookies.remove(cookieNames.refreshToken);
}
