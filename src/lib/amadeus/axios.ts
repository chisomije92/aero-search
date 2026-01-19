import "server-only";
import axios from "axios";

export const amadeusAxios = axios.create({
  baseURL: process.env.AMADEUS_BASE_URL,
  timeout: 400_000,
});

amadeusAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.errors) {
      return Promise.reject({
        type: "AMADEUS_ERROR",
        status: error.response.status,
        errors: error.response.data.errors,
      });
    }

    return Promise.reject({
      type: "NETWORK_ERROR",
      message: error.message,
    });
  },
);
