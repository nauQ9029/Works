import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <Carousel className="home-carousel" controls={false} indicators={false} interval={3000} pause={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/Hocbong.png"
            alt="First slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/TBTS.png"
            alt="Second slide"
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
      <Link to="/chat" className="enter-chatroom-button">Welcome to Simple Chat Room</Link>
    </div>
  );
}

export default Home;
