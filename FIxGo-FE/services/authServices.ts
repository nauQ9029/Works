
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginData, RegisterData } from "../types/auth";
import { default as api, default as BASE_URL } from "./api";
const API_URL = `${BASE_URL}/auth`; 
// const API_URL = "http://192.168.1.16:5000/api/auth"; // PAnh & Luan

export const register = async (data: RegisterData) => {
  const res = await api.post(`/auth/register`, data);
  return res.data;
};

export const login = async (data: LoginData) => {
  const res = await api.post(`/auth/login`, data);

  if (res.data.token && res.data.user) {
    // lưu token và user vào AsyncStorage
    await AsyncStorage.setItem("token", res.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
  }

  return res.data;
};
export const forgotPassword = {
  checkPhone: async (phone: string) => {
    const res = await api.get(`/auth/check-phone?phone=${phone}`);
    return res.data; // { exists: boolean }
  },
  resetPassword: async (phone: string, newPassword: string) => {
    const res = await api.post(`/auth/reset-password`, { phone, newPassword });
    return res.data;
  },
};