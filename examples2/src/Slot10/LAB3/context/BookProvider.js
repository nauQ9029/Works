import { useReducer, useEffect } from "react";
import axios from "axios";
import { BookContext } from "./BookContext";

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    case "DELETE":
      return state.filter((book) => book.id !== action.payload);
    case "TOGGLE_STATUS":
      return state.map((book) =>
        book.id === action.payload
          ? {
              ...book,
              status: book.status === "Read" ? "Unread" : "Read",
            }
          : book
      );
    default:
      return state;
  }
};

export function BookProvider({ children }) {
  const [books, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((res) => dispatch({ type: "SET", payload: res.data }));
  }, []);

  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {children}
    </BookContext.Provider>
  );
}
