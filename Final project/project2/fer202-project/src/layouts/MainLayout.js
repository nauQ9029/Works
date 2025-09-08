
import React from 'react';
import {Link, Outlet } from 'react-router-dom';
import {HomeNavbar} from '../components/common/Navbar';

import Footer from '../components/common/Footer';

const MainLayout = () => {
  return (
    <div>
      <HomeNavbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;
