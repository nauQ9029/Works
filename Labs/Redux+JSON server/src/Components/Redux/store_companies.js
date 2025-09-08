import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from './companiesSlice';
const store = configureStore({
  reducer: {
    companies: companiesReducer    
  }
});

export default store;