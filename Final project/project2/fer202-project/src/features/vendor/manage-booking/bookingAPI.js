import axiosInstance from "../../../services/axiosInstance";





export const fetchBooking = () => {
  return axiosInstance.get(`/Booking/user/1`, {
    withCredentials: true,
  });
}
