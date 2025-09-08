/* 
_____ Mục đích _____
Gọi API lấy giỏ hàng từ server
*/

// Hàm getCart dùng axiosInstance để gửi request tới /cart
export const getCart = () => {
  return axiosInstance.get("/cart", {
    withCredentials: true, // cho phép gửi cookie để xác thực người dùng (nếu cần)
  });
};
