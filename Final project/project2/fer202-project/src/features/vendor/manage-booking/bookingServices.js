
import { fetchBooking } from "./bookingAPI";



export const fetchBookings = async () => {
    try {
        const res = await fetchBooking()
        return res.data;
        
    } catch (error) {
        console.error("Lỗi khi tải bookings:", error);
    }
};
