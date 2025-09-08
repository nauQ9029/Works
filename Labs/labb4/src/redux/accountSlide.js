// accountSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks for async actions
export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
  const response = await fetch('http://localhost:3001/accounts');
  return response.json();
});




export const addAccount = createAsyncThunk('accounts/addAccount', async (account) => {
  const response = await fetch('http://localhost:3001/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account),
  });
  return response.json();
});

export const updateAccount = createAsyncThunk('accounts/updateAccount', async ({ id, updatedAccount }) => {
  const response = await fetch(`http://localhost:3001/accounts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedAccount),
  });
  return response.json();
});

export const deleteAccount = createAsyncThunk('accounts/deleteAccount', async (accountId) => {
  await fetch(`http://localhost:3001/accounts/${accountId}`, {
    method: 'DELETE',
  });
  return accountId;
});

// Slice
const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        const index = state.accounts.findIndex((account) => account.accountId === action.payload.accountId);
        state.accounts[index] = action.payload;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.accounts = state.accounts.filter((account) => account.accountId !== action.payload);
      });
  },
});

export default accountSlice.reducer;
;
