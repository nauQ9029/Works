import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    services: []
};


const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload;
        },
        addService: (state, action) => {
            const { serviceCategoryId, title, description, price } = action.payload;
            const newService = {
                serviceCategoryId,
                title,
                description,
                price
            };
            state.services.push(newService);
        },
        deleteService: (state, action) => {
            const id = action.payload;
            state.services = state.services.filter(service => service.serviceId !== id);
        },
        editService: (state, action) => {
            const { serviceId, serviceCategoryId, title, description, price } = action.payload;
            const index = state.services.findIndex(service => service.serviceId === serviceId);
            if (index !== -1) {
                state.services[index] = {
                    ...state.services[index],
                    serviceCategoryId,
                    title,
                    description,
                    price
                };
            }
        }
    }
});

export const { addService, deleteService, editService } = serviceSlice.actions;
export default serviceSlice.reducer;
