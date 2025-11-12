import axios from "axios";
import api1 from "./api";
const api = axios.create({
  baseURL: "https://fixgo-be.onrender.com/api/bookings",
  timeout: 5000,
});


type GetBookingsParams = {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
};

export const getBookings = async (params?: GetBookingsParams) => {

  const query = new URLSearchParams();
  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.status) query.append("status", params.status);
  if (params?.search) query.append("search", params.search);

  const res = await api.get(`?${query.toString()}`);
  return res.data;
};

export const getBookingById = async (bookingId: string) => {
  try {
    console.log(`Fetching booking with ID: ${bookingId}`);
    const response = await api.get(`/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy booking ${bookingId}:`, error);
    throw error;
  }
};


export const updateBookingStatus = async (id: string, status: string) => {
  const res = await api.patch(`/${id}/status`, { status });
  return res.data;
};
export const sendFeedback = async (
  bookingId: string,
  comment: string,
  rating: number
) => {
  console.log("Sending feedback:", { bookingId, comment, rating });
  try {
    const res = await api1.post(`/ratings/${bookingId}/feedback`, { comment, rating });
    console.log("Feedback response:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Feedback API error:", error.response?.data || error.message);
    throw error;
  }
};

export const getFeedbackByBookingId = async (bookingId: string) => {
  try {
    const res = await api1.get(`/ratings/booking/${bookingId}`);
    return res.data;
  } catch (error: any) {
    console.error("Get feedback API error:", error.response?.data || error.message);
    // Nếu không có feedback, trả về array rỗng thay vì throw error
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};