// companiesSlice.js
import { createSlice } from '@reduxjs/toolkit';
const companiesSlice = createSlice({
  name: 'companies',
  initialState: [], // Use companiesData if you want to preload
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
export default companiesSlice.reducer;