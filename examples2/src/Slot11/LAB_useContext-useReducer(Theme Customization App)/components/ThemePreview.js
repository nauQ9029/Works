import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemePreview = () => {
  const { state } = useContext(ThemeContext);

  const previewStyle = {
    backgroundColor: state.backgroundColor,
    color: state.textColor,
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid gray",
  };

  return (
    <div style={previewStyle} className="text-center">
      <h2>Live Theme Preview</h2>
      <p>
        <strong>Background:</strong> {state.backgroundColor}
      </p>
      <p>
        <strong>Text:</strong> {state.textColor}
      </p>
      <p>
        <strong>Mode:</strong> {state.mode}
      </p>
    </div>
  );
};

export default ThemePreview;
