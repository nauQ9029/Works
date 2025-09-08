export const initialState = {
    patients: [],
    loading: true,
    error: ''
  };
  
  export const patientReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          loading: false,
          patients: action.payload,
          error: ''
        };
      case 'FETCH_ERROR':
        return {
          loading: false,
          patients: [],
          error: 'Something went wrong!'
        };
      case 'ADD_PATIENT':
        return {
          ...state,
          patients: [...state.patients, action.payload]
        };
      case 'EDIT_PATIENT':
        return {
          ...state,
          patients: state.patients.map(patient =>
            patient.id === action.payload.id ? action.payload : patient
          )
        };
      case 'DELETE_PATIENT':
        return {
          ...state,
          patients: state.patients.filter(patient => patient.id !== action.payload)
        };
      default:
        return state;
    }
  };
  