import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ImgCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/Lemons.jpg"
          alt="First slide"
          style={{ height: "600px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Slide 1</h3>
          <p>Description about image.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/RedDeliciousApples.jpg"
          alt="Second slide"
          style={{ height: "600px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Slide 2</h3>
          <p>Description about image.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/Strawberries.jpg"
          alt="Third slide"
          style={{ height: "600px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Slide 3</h3>
          <p>Description about image.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ImgCarousel;
