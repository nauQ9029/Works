/*
_____ Mục đích _____
Lưu trữ và xử lý các thao tác giỏ hàng trong Redux store
*/

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.serviceId === newItem.serviceId
      );

      // Nếu đã có: không thêm (do nothing)
      if (existingItem) {
        // existingItem.quantity += 1;
        // state.totalQuantity += 1;
        // state.totalPrice += newItem.price;
        return;
      }
      // Nếu chưa có: thêm sản phẩm, cập nhật tổng số lượng và giá tiền
      // Lưu ý: hiện tại không hỗ trợ quantity. Để thêm quantity, bạn phải thêm thuộc tính này vào newItem.
      else {
        state.items.push({ ...newItem });
        state.totalQuantity += 1;
        state.totalPrice += newItem.price;
      }
    },
    // Xóa một item khỏi giỏ theo serviceId
    removeFromCart: (state, action) => {
      const id = Number(action.payload);
      console.log("State items:", state.items);
      console.log("ID to remove:", id);
      const itemToRemove = state.items.find((item) => item.serviceId === id);
      if (!itemToRemove) return;

      state.totalQuantity -= itemToRemove.quantity;
      state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
      state.items = state.items.filter((item) => item.serviceId !== id);
    },

    //     updateQuantity: (state, action) => {
    //   const { id, quantity } = action.payload;
    //   const item = state.items.find(item => item.serviceId === id);
    //   if (item && typeof item.quantity === 'number' && quantity > 0) {
    //     const diff = quantity - item.quantity;
    //     item.quantity = quantity;
    //     state.totalQuantity += diff;
    //     state.totalPrice += diff * item.price;
    //   }
    // },

    // Reset toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
