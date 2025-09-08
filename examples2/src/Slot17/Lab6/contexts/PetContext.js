import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const PetContext = createContext();

const initialState = {
  centerName: "",
  location: "",
  pets: [],
  filteredPets: [],
  maxFee: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        centerName: action.payload.centerName,
        location: action.payload.location,
        pets: action.payload.pets,
        filteredPets: action.payload.pets,
      };
    case "FILTER_BY_FEE":
      return {
        ...state,
        maxFee: action.payload,
        filteredPets: state.pets.filter(
          (pet) => pet.adoptionFee <= action.payload
        ),
      };
    default:
      return state;
  }
};

export const PetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get("http://localhost:5000/petCenter").then((res) => {
      dispatch({ type: "SET_DATA", payload: res.data });
    });
  }, []);

  return (
    <PetContext.Provider value={{ state, dispatch }}>
      {children}
    </PetContext.Provider>
  );
};
