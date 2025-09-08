import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../home.css';
import logo from '../images/logo_fpt.jpg';
import banner1 from '../images/Hocbong-100-e-bannerweb.png';
import banner2 from '../images/TBTS-DHFPT-2024-bannerweb.png';
import banner3 from '../images/43irh1aw-toi-uu.webp';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <img src={logo} alt="FPT University Logo" className="logo" />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/chatRoom">Chat Room</Link>
        </nav>
      </header>

      <Carousel className="banner-carousel">
        <Carousel.Item>
          <img src={banner1} alt="Banner 1" className="d-block w-100" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={banner2} alt="Banner 2" className="d-block w-100" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={banner3} alt="Banner 3" className="d-block w-100" />
        </Carousel.Item>
      </Carousel>

      <main className="home-main">
        <h1>Welcome to Simple Chat Room</h1>
      </main>

      <footer className="home-footer">
        <p>@2024 - Created by FPTU</p>
      </footer>
    </div>
  );
}

export default Home;
