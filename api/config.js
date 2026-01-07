import axios from "axios";
import { serverConstant } from "./server-constant";
const publicApi = axios.create({
  baseURL: serverConstant.authenticationUrls,
});
const secureApi = axios.create({
  baseURL: serverConstant.authenticationUrls,
});
const chatApi = axios.create({
  baseURL: serverConstant.chatUrls,
});
secureApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
chatApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export { publicApi, secureApi, chatApi };
