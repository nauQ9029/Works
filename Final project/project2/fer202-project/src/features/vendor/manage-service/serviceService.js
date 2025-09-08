import { deleteServiceAPI, fetchServiceAPI, addServiceAPI, updateServiceAPI } from "./serviceAPI";
export const deleteService = async (id) => {
  try {
    const res = await deleteServiceAPI(id);
    return res.data;
  } catch (error) {
    console.error('Lỗi khi xoá dịch vụ:', error);
    throw error;
  }
};

export const fetchService = async () => {
  try {
    const res = await fetchServiceAPI();
    return res.data;
  } catch (error) {
    console.error('Lỗi khi fetch dịch vụ:', error);
    throw error;
  }
};

export const addService = async (data) => {
  try {
    const res = await addServiceAPI(data);
    return res.data;
  } catch (error) {
    console.error('Lỗi khi thêm dịch vụ:', error);
    throw error;
  }
};

export const updateService = async (data) => {
  try {
    const res = await updateServiceAPI(data);
    return res.data;
  } catch (error) {
    console.error('Lỗi khi thêm dịch vụ:', error);
    throw error;
  }
};
