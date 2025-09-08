import { configureStore, createSlice } from "@reduxjs/toolkit";
import companiesData from "../../shared/companies";
const companiesSlice = createSlice({
  name: "companies",
  initialState: [
    {
      id: "1",
      name: "Company One",
      category: "Finance",
      start: 1981,
      end: 2004,
    },
    {
      id: "2",
      name: "Company Two",
      category: "Retail",
      start: 1992,
      end: 2008,
    },
    {
      id: "3",
      name: "Company Three",
      category: "Auto",
      start: 1999,
      end: 2007,
    },
    {
      id: "4",
      name: "Company Four",
      category: "Retail",
      start: 1989,
      end: 2010,
    },
    {
      id: "5",
      name: "Company Five",
      category: "Technology",
      start: 2009,
      end: 2014,
    },
    {
      id: "6",
      name: "Company Six",
      category: "Finance",
      start: 1987,
      end: 2010,
    },
    {
      id: "7",
      name: "Company Seven",
      category: "Auto",
      start: 1986,
      end: 1996,
    },
    {
      id: "8",
      name: "Company Eight",
      category: "Technology",
      start: 2011,
      end: 2016,
    },
    {
      id: "9",
      name: "Company Nine",
      category: "Retail",
      start: 1981,
      end: 1989,
    },
  ],
  reducers: {
    addCompany(state, action) {
      state.push(action.payload);
    },
    removeCompany(state, action) {
      return state.filter((company) => company.id !== action.payload);
    },
    loadingCompies(state, action) {
      return;
    },
  },
});

export const { addCompany, removeCompany } = companiesSlice.actions;
const store = configureStore({
  reducer: {
    companies: companiesSlice.reducer,
  },
});

export default store;
