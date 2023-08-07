import axios from "axios";

import { getAccessToken } from "./AuthService";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

httpClient.interceptors.request.use((config: any) => {
  return {
    ...config,
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };
});

export default httpClient;
