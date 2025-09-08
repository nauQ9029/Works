import React, { createContext, useReducer, useEffect } from 'react';
import { patientReducer, initialState } from '../reducers/patientReducer';
import { fetchPatients } from '../services/patientService';

export const PatientContext = createContext();

const PatientContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientReducer, initialState);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const patients = await fetchPatients();
        dispatch({ type: 'FETCH_SUCCESS', payload: patients });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' });
      }
    };

    getPatients();
  }, []);

  return (
    <PatientContext.Provider value={{ state, dispatch }}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
