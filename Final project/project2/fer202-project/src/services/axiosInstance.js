
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://18.140.1.178/api/",
  timeout: 10000,

});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
