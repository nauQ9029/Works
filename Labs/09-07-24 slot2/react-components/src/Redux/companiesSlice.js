import { createSlice } from "@reduxjs/toolkit"
const companiesSlice = createSlice( {
    name: 'companies',
    initialState: [],    // Initialize as null to use comapniesData if you wnat to preload
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

export const { setCompanies, removeCompany, AddCompany } = companiesSlice.actions;
export default companiesSlice.reducer;   