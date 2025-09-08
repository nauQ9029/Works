
import React from 'react';
import {Link, Outlet } from 'react-router-dom';
import {HomeNavbar, VendorDashboardNavbar} from '../components/common/Navbar';

import Footer from '../components/common/Footer';
import VendorSidebar, { AdminSidebar } from '../components/DashboardSidebar';

export const VendorDashboardLayout = () => {
  return (
    <><div className='stores-content'>
      <VendorSidebar/>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
    
      <Footer/></>
    
  );
};

export const AdminDashboardLayout = () => {
  return (
    <><div className='stores-content'>
      <AdminSidebar/>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
    
      <Footer/></>
    
  );
};

export default VendorDashboardLayout;
