export const patientReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    case "DELETE":
      return state.filter((p) => p.id !== action.payload);
    default:
      return state;
  }
};
