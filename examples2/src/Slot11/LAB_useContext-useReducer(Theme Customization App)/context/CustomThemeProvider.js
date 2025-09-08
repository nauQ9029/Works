import { useReducer, useEffect } from "react";
import ThemeContext from "./ThemeContext";

const initialState = {
  mode: "light",
  backgroundColor: "#ffffff",
  textColor: "#000000",
};

function themeReducer(state, action) {
  switch (action.type) {
    case "SET_MODE":
      if (action.payload === "light") {
        return {
          mode: "light",
          backgroundColor: "#ffffff",
          textColor: "#000000",
        };
      }
      if (action.payload === "dark") {
        return {
          mode: "dark",
          backgroundColor: "#000000",
          textColor: "#ffffff",
        };
      }
      return { ...state, mode: "custom" };
    case "SET_CUSTOM_COLORS":
      return {
        ...state,
        backgroundColor: action.payload.backgroundColor,
        textColor: action.payload.textColor,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const CustomThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // // Apply global styles to body
  // useEffect(() => {
  //   document.body.style.backgroundColor = state.backgroundColor;
  //   document.body.style.color = state.textColor;
  // }, [state]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
