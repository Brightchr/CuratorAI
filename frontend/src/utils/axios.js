import axios from "axios";
import { getIdToken } from "../services/authService";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000",
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  const token = await getIdToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
