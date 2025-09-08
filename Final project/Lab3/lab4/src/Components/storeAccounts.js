import { configureStore, createSlice } from '@reduxjs/toolkit';
import accountsData from '../';
const accountsSlice = createSlice({
    name: 'accounts',
    initialState: [],
    reducers: {
        addAccount(state, action) {
            state.push(action.payload);
        },
        removeAccount(state, action) {
            return state.filter(account => account.id !== action.payload);
        },
        // updateAccount(state, action) {
        //     const index = state.findIndex(account => account.accountId === action.payload.accountId);
        //     if (index !== -1) {
        //         state[index] = action.payload;
        //     }
        // },
        setAccounts(state, action) {
            return action.payload;
        }
    }
});

export const { setaccounts, addAccount, removeAccount } = accountsSlice.actions;
const store = configureStore({
    reducer: {
        accounts: accountsSlice.reducer
    }
});

export default store;