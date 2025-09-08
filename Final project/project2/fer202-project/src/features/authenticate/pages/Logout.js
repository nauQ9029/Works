import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log("status auth: " + isAuthenticated)
    useEffect(() => {
        if (isAuthenticated) {
            console.log("ready dispatch")
            dispatch(logout());
            console.log(isAuthenticated)
            navigate("/");
        }
    }, [isAuthenticated]);

    return null;
};

export default Logout;
