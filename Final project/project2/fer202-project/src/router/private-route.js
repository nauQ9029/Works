
import React from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthStatus } from '../features/authenticate/authThunk';
import route from './landing-router';
import MainLayout from '../layouts/MainLayout';

export const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  

    if (!isAuthenticated) {
        console.log(isAuthenticated)
        return <Navigate to="/login" replace />;
    }
        return children;
    

};

export const PrivateVendorRoute = ({ children }) => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state)=> state.auth.user);
  

    if (!isAuthenticated || user.role != "vendor") {
        return <Navigate to="/" replace />;
    }

        return children;
    

};

export const PrivateAdminRoute = ({ children }) => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state)=> state.auth.user);
  

    if (!isAuthenticated || user.role != "admin") {
        return <Navigate to="/" replace />;
    }

        return children;
    

};

export default PrivateRoute;
