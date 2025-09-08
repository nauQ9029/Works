import axios from 'axios';
import axiosInstance from "../../services/axiosInstance";


export const authenticateAPI = () => {
  return axiosInstance.get("/auth/status", {
    withCredentials: true,
  });
}

export const loginAPI = (data) => {
  return axiosInstance.post('/Auth/login',{
    email: data.email,
    password: data.password
  }, {
    withCredentials: true
  })
}

// export const loginGoogleAPI = (data) => {
//   return axiosInstance.post('/login-google',{
//     email: data.email,
//     password: data.password
//   }, {
//     withCredentials: true
//   })
// }

export const registerAPI = (data) => {
    return axiosInstance.post('/Auth/register',{
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: data.role,
      businessName: data.businessName,
      description: data.description,
      mst: data.mst
  }, {
    withCredentials: true
  })
}

export const logoutAPI = () => {
  return axiosInstance.get('/logout', {
    withCredentials: true,
  })
}

