import jwt_decode from "jwt-decode";

import { User } from "../types/User/User";
import httpClient from "./HttpClientService";
import { Response } from "../types/User/Auth/Response";

export const getUser = async (): Promise<User | undefined> => {
  const userToken = getAccessToken();

  if (!userToken) return undefined;

  const userId = getUserIdFromToken(userToken);

  const response = await httpClient.get("/users/" + userId);

  return response.data;
};

export const login = async (
  email: string,
  password: string
): Promise<Response | undefined> => {
  try {
    const response = await httpClient.post("/auth/local/signin", {
      email,
      password,
    });

    return response.data;
  } catch (e) {
    console.error(e);

    return undefined;
  }
};

export const logout = () => {
  removeAccessToken();
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem("_", token);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem("_");
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem("_r", token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("_");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("_r");
};

export const getUserIdFromToken = (token: string): number | undefined => {
  const decoded = jwt_decode(token) as any;

  if (decoded) {
    return decoded.sub;
  }

  return undefined;
};
