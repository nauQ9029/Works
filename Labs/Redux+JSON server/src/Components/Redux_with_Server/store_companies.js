import { configureStore, createSlice } from '@reduxjs/toolkit';
import companiesData from '../../shared/companies';
const companiesSlice = createSlice({
  name: 'companies',
  initialState: [],
  reducers: {
    addCompany(state, action) {
      state.push(action.payload);
    },
    removeCompany(state, action) {
      return state.filter(company => company.id !== action.payload);
    },
    setCompanies(state, action) {
      return action.payload;
    }
  }
});

export const { setCompanies, addCompany, removeCompany } = companiesSlice.actions;
const store = configureStore({
  reducer: {
    companies: companiesSlice.reducer    
  }
});

export default store;