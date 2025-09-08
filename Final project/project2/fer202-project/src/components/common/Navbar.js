import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/common/navbar.css';


export const LandingNavbar = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <span className="logo-hat">Hat</span><span className="logo-de">De</span>
      </div>

      <nav className="nav-menu">
        <a href="../">Trang chủ</a>
        <a href="../wedding">Dịch vụ</a>
        <a href="../accessory">Phụ kiện trang trí</a>
      </nav>

      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Tìm kiếm..." />
      </div>

      <div className="nav-button">
        {/* <i className="fas fa-user"></i> */}
        <a href="../login">Đăng nhập</a>
        <a href="../register">Đăng ký</a>
      </div>
    </header>
  );
  };
  

  export const HomeNavbar = () => {
    
    
    return (
      <header className="main-header">
        <div className="logo">
          <span className="logo-hat">Hat</span><span className="logo-de">De</span>
        </div>
  
        <nav className="nav-menu">

        <a href="../">Trang chủ</a>
        <a href="../wedding">Dịch vụ</a>
        <a href="../accessory">Phụ kiện trang trí</a>
      </nav>

  
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Tìm kiếm..." />
        </div>
  
        <div className="nav-icons">
          <a href="#"><i className="far fa-heart"></i></a>
          <a href="../cart"><i className="fas fa-shopping-cart"></i></a>
          <a href="../profile"><i className="fas fa-user"></i></a>
        </div>
      </header>
    );
  };



  
  export const VendorDashboardNavbar = () => {
    return (
      <header className="main-header">
        <div className="logo">
          <span className="logo-hat">Hat</span><span className="logo-de">De</span>
        </div>
  
        <nav className="nav-menu">
        <a href="../dashboard">Doanh thu</a>
        <a href="../shop">Cửa hàng của tôi</a>
        <a href="../booking">Đơn hàng</a>
        <a href="../discount">Khuyến mại</a>

      </nav>

  
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Tìm kiếm..." />
        </div>
  
        <div className="nav-icons">
          <a href="../profile"><i className="fas fa-user"></i></a>
        </div>
      </header>
    );
  };


  
  export const AdminDashboardNavbar = () => {
    return (
      <header className="main-header">
        <div className="logo">
          <span className="logo-hat">Hat</span><span className="logo-de">De</span>
        </div>
  
        <nav className="nav-menu">
        <a href="../">Trang chủ</a>
        <a href="../user">Cửa hàng của tôi</a>
        <a href="../booking">Đơn hàng</a>
        <a href="../discount">Khuyến mại</a>

      </nav>

  
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Tìm kiếm..." />
        </div>
  
        <div className="nav-icons">
          <a href="../profile"><i className="fas fa-user"></i></a>
        </div>
      </header>
    );
  };