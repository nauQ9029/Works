const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: "FETCH_USERS_START" });
  try {
    const res = await fetch("http://localhost:3001/users");
    const data = await res.json();
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
  } catch (err) {
    dispatch({ type: "FETCH_USERS_ERROR", payload: err.message });
  }
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USERS_START":
      return { ...state, loading: true };
    case "FETCH_USERS_SUCCESS":
      return { ...state, loading: false, users: action.payload };
    case "FETCH_USERS_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
