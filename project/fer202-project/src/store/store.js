import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authenticate/authSlice"
import cartReducer from "../features/manage-cart/cartSlice"
import bookingReducer from "../features/booking/bookingSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import categoryReducer from '../services/categorySlice'
import serviceReducer from '../features/vendor/manage-service/serviceSlice'
// import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'] ,
  
  // blacklist: ['booking']
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  booking: bookingReducer,
  categories: categoryReducer,
  services: serviceReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
