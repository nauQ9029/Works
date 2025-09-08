import { configureStore } from '@reduxjs/toolkit';
import newProductReducer from './slides/NewProductSlide';
import updateableProductReducer from './slides/UpdateableProductSlide';

// Configure the Redux store
export const store = configureStore({
	reducer: {
		newProduct: newProductReducer,
		updateableProduct: updateableProductReducer,
	},
});

// Export the store, no need for type definitions in JavaScript
