
import { fetchBookingAPI, updateBookingAPI, fetchBookingDetailAPI } from "./bookingAPI";



export const fetchBookings = async () => {
    try {
        const res = await fetchBookingAPI()
        return res.data;
        
    } catch (error) {
        console.error("Lỗi khi tải bookings:", error);
    }
};


export const fetchBookingDetail = async (id) => {
    try {
        const res = await fetchBookingDetailAPI(id)
        return res.data;
        
    } catch (error) {
        console.error(`Lỗi khi tải bookings: ${id}`, error);
    }
};



export const updateBooking = async (id, nextStatus) => {
    
        const res = await updateBookingAPI(id,nextStatus)
        return res.data;
       
};

