import axios, { AxiosError } from "axios";

const baseURL = "http://localhost:8080";

export interface IAxiosError extends AxiosError {}
export const isAxiosError = axios.isAxiosError;

const axiosApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosApi;