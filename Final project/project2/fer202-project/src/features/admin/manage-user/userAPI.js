import axiosInstance from "../../../services/axiosInstance";

export const changeStatusUserAPI = (id, status) => {
  return axiosInstance.get(`/User/change-status?id=${id}&status=${status}`);
};

export const fetchUserAPI = () => {
  return axiosInstance.get(`/User`);
};
