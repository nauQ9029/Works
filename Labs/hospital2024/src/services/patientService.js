import axios from 'axios';

const API_URL = 'http://localhost:5000/patients';

export const fetchPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPatient = async (patient) => {
  const response = await axios.post(API_URL, patient);
  return response.data;
};

export const updatePatient = async (patient) => {
  const response = await axios.put(`${API_URL}/${patient.id}`, patient);
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
