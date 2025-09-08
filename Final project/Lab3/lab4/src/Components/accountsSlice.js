import { configureStore } from '@reduxjs/toolkit';
import accountsReducer

const store = configureStore({
  reducer: {
    accounts: accountsReducer
  }
});

export default store;
