import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const API_BASE_URL = 'https://fixgo-be.onrender.com';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, 
  timeout: 10000,
});


api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
