import axios from 'axios';

const API_URL = 'http://localhost:3001/lab4';

export const fetchAccounts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addAccount = async (account) => {
  const response = await axios.post(API_URL, account);
  return response.data;
};

export const updateAccount = async (account) => {
  const response = await axios.put(`${API_URL}/${account.accountId}`, account);
  return response.data;
};

export const deleteAccount = async (accountId) => {
  const response = await axios.delete(`${API_URL}/${accountId}`);
  return response.data;
};
