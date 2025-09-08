
import React from 'react';
import {Link, Outlet } from 'react-router-dom';
import {HomeNavbar, LandingNavbar} from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useSelector, useDispatch } from 'react-redux';

const LandingLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      {isAuthenticated? <HomeNavbar/>:<LandingNavbar />}
      <main className="main-content">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default LandingLayout;
