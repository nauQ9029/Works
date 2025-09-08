import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./authThunk";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, isAuthenticated: false, status: "idle", error: "idle" },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            console.log("reducer: ", state.isAuthenticated)
            state.status = "idle";
            state.error = null;
        }
    },           // handle change in local UI
    // extraReducer + createAsyncThunk: handle download from/ upload to server
    extraReducers: (builder) => {
        builder
            // login action
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.data;
                state.isAuthenticated = true;
                state.error = null;
                // localStorage.setItem("user", JSON.stringify(state.user));

                // console.log(action.payload.data)
                // console.log(state.isAuthenticated)
            })
            .addCase(login.rejected, (state, action) => {
                console.log("error code: " + action.payload.status)
                state.status = "failed";
                state.error = action.payload.status
            })
            // register action
            .addCase(register.pending, (state) => {
                state.status = "loading"
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "succeeded"
                // state.user = action.payload.data
                state.error = null
                console.log(action.payload.data)
            })
            .addCase(register.rejected, (state, action) => {
                console.log("error code: " + action.payload.status)
                state.status = "failed";
            })

            //logout action
            // .addCase(logout.pending, (state) => {
            //     state.status = "loading";
            // })
            // .addCase(logout.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     state.isAuthenticated = false;
            //     state.user = null;
            //     state.error = null;
            //     console.log("success : " + action.payload)
            // })
            // .addCase(logout.rejected, (state, err) => {
            //     state.status = "failed"
            //     console.log("error code: " + err)
            // })

            
            
    },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer