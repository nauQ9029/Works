import axiosInstance from "../../services/axiosInstance";
export const weddingServiceAPI = () => {
  return axiosInstance.get("/ServiceCategory/service-wedding", {
    withCredentials: true,
  });
}

export const getServiceByIdAPI = (id) => {
  return axiosInstance.get(`/Service/${id}`, {
    withCredentials: true,
  });
}



export const accessoryServiceAPI = () => {
  return axiosInstance.get(`/ServiceCategory/service-accessory`, {
    withCredentials: true,
  });
}


