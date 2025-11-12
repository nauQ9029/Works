import axios from "axios";

const API_URL = "https://fixgo-be.onrender.com/api/customers"; 

export const getCustomersLookingForMechanic = async (location: { latitude: number; longitude: number }) => {
  try {
    const res = await axios.post(`${API_URL}/looking-for-mechanics`, {
      latitude: location.latitude,
      longitude: location.longitude,
      radius: 1000,
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi gọi API getCustomersLookingForMechanic:", err);
    return [];
  }
};
