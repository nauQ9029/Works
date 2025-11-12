
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LoginData, RegisterData } from "../types/auth";
const API_URL = "http://192.168.1.16:5000/api/auth"; 

export const register = async (data: RegisterData) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const login = async (data:LoginData) => {
  const res = await axios.post(`${API_URL}/login`, data);
    if (res.data.token) {
    await AsyncStorage.setItem("token", res.data.token);
  }
  return res.data;
};
export const forgotPassword = {
  checkPhone: async (phone: string) => {
    const res = await axios.get(`${API_URL}/check-phone?phone=${phone}`);
    return res.data; // { exists: boolean }
  },
  resetPassword: async (phone: string, newPassword: string) => {
    const res = await axios.post(`${API_URL}/reset-password`, { phone, newPassword });
    return res.data;
  },
};