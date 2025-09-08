// store.js
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlide';

const store = configureStore({
  reducer: {
    accounts: accountReducer
  },
});

export default store;
