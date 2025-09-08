import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <Carousel className="home-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/Hocbong.png"
            alt="Hoc Bong"
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/TBTS.png"
            alt="Tuyen Sinh"
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/360.webp"
            alt="Third slide"
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <h1>Welcome to Simple Chat Room</h1>
    </div>
  );
}

export default Home;