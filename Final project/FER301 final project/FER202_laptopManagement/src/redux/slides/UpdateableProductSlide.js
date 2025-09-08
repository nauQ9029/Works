import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    currentPrice: 0,
    image: '',
};

const updatableProductSlide = createSlice({
    name: 'updatableProduct',
    initialState,
    reducers: {
        changeId(state, action) {
            state.id = action.payload;
        },
        changeName(state, action) {
            state.name = action.payload;
        },
        changeDescription(state, action) {
            state.description = action.payload;
        },
        changePrice(state, action) {
            if (action.payload > 0) state.price = action.payload;
        },
        changeCurrentPrice(state, action) {
            if (action.payload > 0) state.currentPrice = action.payload;
        },
        changeImage(state, action) {
            state.image = action.payload;
        },
        reset(state) {
            state.id = 0;
            state.name = '';
            state.description = '';
            state.price = 0;
            state.currentPrice = 0;
            state.image = '';
        },
    },
});

export const {
    changeId,
    changeName,
    changeDescription,
    changePrice,
    changeCurrentPrice,
    changeImage,
    reset,
} = updatableProductSlide.actions;

export default updatableProductSlide.reducer;
