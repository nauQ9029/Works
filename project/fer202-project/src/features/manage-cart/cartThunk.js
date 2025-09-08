/* 
_____ Mục đích _____
Xử lý async logic với createAsyncThunk
*/

export const getCart = createAsyncThunk("auth/checkAuthStatus", async () => {
  const res = await authenticateAPI();
  // const data = res.json();
  return res.data;
  // else return thunkAPI.rejectWithValue({ message: "unauthorized" });
});
