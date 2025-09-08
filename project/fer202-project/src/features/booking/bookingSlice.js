import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        serviceIds: [],
        userId: null,
        totalPrice: 0,
        eventDate: null,
        note: '',
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        paymentMethod: ''
    },
    reducers: {
        setBookingInfo: (state, action) => {
            const { name, phone, address, note, eventDate, paymentMethod } = action.payload;
            state.receiverName = name;
            state.receiverPhone = phone;
            state.receiverAddress = address;
            state.eventDate = eventDate;
            state.paymentMethod = paymentMethod;
            state.note = note;
        },

        addService: (state, action) => {
            state.serviceIds.push(action.payload);
        },
        removeService: (state, action) => {
            state.serviceIds = state.serviceIds.filter(id => id !== action.payload);
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        setEventDate: (state, action) => {
            state.eventDate = action.payload;
        },
        setNote: (state, action) => {
            state.note = action.payload;
        },
        setBookingName: (state, action) => {
            state.receiverName = action.payload;
        },
        setPhone: (state, action) => {
            state.receiverPhone = action.payload;
        },
        setAddress: (state, action) => {
            state.receiverAddress = action.payload;
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        resetBooking: () => ({
            serviceIds: [],
            userId: null,
            totalPrice: 0,
            eventDate: null,
            note: '',
            receiverName: '',
            phone: '',
            receiverAddress: '',
            paymentMethod: ''
        })
    },
    // extraReducers: (builder) => {
    //     builder
        
    //         .addCase(addBooking.rejected, (state) => {
                
    //         })
    // }

})

export const {
    addService,
    removeService,
    setUserId,
    setTotalPrice,
    setEventDate,
    setNote,
    setBookingName,
    setPhone,
    setAddress,
    setPaymentMethod,
    resetBooking,
    setBookingInfo
} = bookingSlice.actions;

export default bookingSlice.reducer;
