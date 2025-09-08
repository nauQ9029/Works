import React, { useEffect } from "react";
import AppRouter from "./router/landing-router"
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./features/authenticate/authThunk";
import axiosInstance from "./services/axiosInstance";
import { setCategories } from "./services/categorySlice";

function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosInstance.get('/ServiceCategory')
                dispatch(setCategories(res.data));
            } catch (error) {
                console.error('Lỗi khi fetch categories:', error);
            }
        };

        fetchCategories();
    }, [dispatch]);

    return (

        <div className="App">
            <AppRouter />
        </div>
    );
}

export default App;
