import { createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit";
import { addBookingAPI, fetchBookingByUserAPI, paymentAPI , paymentStatusAPI} from "./bookingAPI";

export const addBooking = async (data) => {
    try {
        const response = await addBookingAPI(data)
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error while add booking services:", error);
        throw error;
    }
};

export const fetchBookingsByUser = async (id) => {
    try {
        const res = await fetchBookingByUserAPI(id)
        return res.data;
        
    } catch (error) {
        console.error("Lỗi khi tải bookings:", error);
    }
};

export const getPayment = async (id, total) => {
    try {
        const res = await paymentAPI(id, total)
        return res.data;
        
    } catch (error) {
        console.error("Lỗi khi tải thông tin thanh toán:", error);
    }
};

export const changePaymentStatus = async (id, status) => {
    try {
        const res = await paymentStatusAPI(id, status)
        return res.data;
        
    } catch (error) {
        console.error("Lỗi khi update thông tin thanh toán:", error);
    }
};