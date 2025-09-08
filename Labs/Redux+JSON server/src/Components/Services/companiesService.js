import axios from 'axios';

const API_URL = 'http://localhost:4000/companiesData';

export const fetchCompanies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addCompany = async (company) => {
  const response = await axios.post(API_URL, company);
  return response.data;
};

export const updateCompany = async (company) => {
  const response = await axios.put(`${API_URL}/${company.id}`, company);
  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};