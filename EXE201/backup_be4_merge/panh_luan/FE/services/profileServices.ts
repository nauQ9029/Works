import axios from "axios";


const API_BASE_URL = "http://192.168.1.16:5000/api/profile";

export const getMechanicByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data; 
  } catch (err: any) {
    console.error("getMechanicByUserId error:", err?.response?.data || err.message);
    throw err;
  }
};
export const updateUserProfile = async (userId: string, payload: any) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/${userId}`, payload);
    return res.data;
  } catch (err: any) {
    console.error("updateUserProfile error:", err?.response?.data || err.message);
    throw err;
  }
};
