import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: [],
  reducers: {
    addExpense: (state, action) => {
      state.push({ id: Date.now(), ...action.payload });
    },
    deleteExpense: (state, action) => {
      return state.filter((exp) => exp.id !== action.payload);
    },
    clearAll: () => [],
  },
});

export const { addExpense, deleteExpense, clearAll } = expenseSlice.actions;
export default expenseSlice.reducer;
