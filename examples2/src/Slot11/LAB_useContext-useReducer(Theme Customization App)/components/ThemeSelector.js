import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeSelector = () => {
  const { state, dispatch } = useContext(ThemeContext);

  const handleModeChange = (e) => {
    dispatch({ type: "SET_MODE", payload: e.target.value });
  };

  const handleColorChange = (e) => {
    dispatch({
      type: "SET_CUSTOM_COLORS",
      payload: { ...state, [e.target.name]: e.target.value },
    });
  };

  return (
    <div>
      <h3>Select Theme:</h3>
      <select value={state.mode} onChange={handleModeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="custom">Custom</option>
      </select>

      {state.mode === "custom" && (
        <div style={{ marginTop: "10px" }}>
          <label>
            Background Color:
            <input
              type="color"
              name="backgroundColor"
              value={state.backgroundColor}
              onChange={handleColorChange}
            />
          </label>
          <br />
          <label>
            Text Color:
            <input
              type="color"
              name="textColor"
              value={state.textColor}
              onChange={handleColorChange}
            />
          </label>
        </div>
      )}

      <button
        onClick={() => dispatch({ type: "RESET" })}
        style={{ marginTop: "10px" }}
      >
        Reset to Default
      </button>
    </div>
  );
};

export default ThemeSelector;
