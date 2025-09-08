import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeToggler = () => {
  const { state, dispatch } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newMode = state.mode === "dark" ? "light" : "dark";
    dispatch({ type: "SET_MODE", payload: newMode });
  };

  return (
    <button onClick={toggleTheme} style={{ marginBottom: "20px" }}>
      Toggle Light/Dark
    </button>
  );
};

export default ThemeToggler;
