import axios from "axios";

export const ClientAxios = axios.create({
  baseURL: "/api",
  timeout: 400_000,
});
