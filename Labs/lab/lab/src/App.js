import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  useEffect(() => {
    const carouselElement = document.querySelector("#libraryCarousel");
    if (carouselElement) {
      const bootstrap = require("bootstrap");
      new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: "carousel",
      });
    }
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <i className="bi bi-book-half"></i> My Dream Library
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="books">
                  Books
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="gallery">
                  Gallery
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero with Carousel */}
      <section className="hero-carousel fixed-height-carousel">
        <div
          id="libraryCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="images/book1.jpg"
                className="d-block w-100"
                alt="Library Slide 1"
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>Read. Imagine. Grow.</h1>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="images/book2.jpg"
                className="d-block w-100"
                alt="Library Slide 2"
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>Explore New Worlds in Books</h1>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="images/book3.jpg"
                className="d-block w-100"
                alt="Library Slide 3"
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>Discover. Learn. Inspire.</h1>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#libraryCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#libraryCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Welcome to My Dream Library</h2>
              <p>
                Our library is a haven for knowledge seekers, book lovers, and
                dreamers. We provide cozy corners and rich resources that
                empower students to grow and succeed.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
                className="img-fluid rounded"
                alt="Library"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section id="books" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Books</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card h-100">
                <img
                  src="/images/theLongestDay.jpg"
                  className="card-img-top"
                  alt="Book Cover"
                />
                <div className="card-body">
                  <h5 className="card-title">The Longest Day</h5>
                  <p className="card-text">Cornelious Ryann</p>
                  <div className="rating">
                    &#9733;&#9733;&#9733;&#9733;&#9734;
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <img
                  src="/images/japaneseMinimalism.jpg"
                  className="card-img-top"
                  alt="Book Cover"
                />
                <div className="card-body">
                  <h5 className="card-title">Japanese Minimalism</h5>
                  <p className="card-text">Nicole Garrod</p>
                  <div className="rating">
                    &#9733;&#9733;&#9733;&#9733;&#9734;
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <img
                  src="/images/theAlchemist.jpg"
                  className="card-img-top"
                  alt="Book Cover"
                />
                <div className="card-body">
                  <h5 className="card-title">The Alchemist</h5>
                  <p className="card-text">Paulo Coelho</p>
                  <div className="rating">
                    &#9733;&#9733;&#9733;&#9733;&#9734;
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <img
                  src="/images/theLake.jpg"
                  className="card-img-top"
                  alt="Book Cover"
                />
                <div className="card-body">
                  <h5 className="card-title">The Lake</h5>
                  <p className="card-text">Banana Yoshimoto</p>
                  <div className="rating">
                    &#9733;&#9733;&#9733;&#9733;&#9734;
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <img
                  src="/images/chuyen1Doi.jpg"
                  className="card-img-top"
                  alt="Book Cover"
                />
                <div className="card-body">
                  <h5 className="card-title">Chuyện một đời</h5>
                  <p className="card-text">Shogo Sato</p>
                  <div className="rating">
                    &#9733;&#9733;&#9733;&#9733;&#9734;
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <img
                  src="/images/theLongestDay.jpg"
                  className="card-img-top"
                  alt="Book Cover"
                />
                <div className="card-body">
                  <h5 className="card-title">The Longest Day</h5>
                  <p className="card-text">Cornelious Ryann</p>
                  <div className="rating">
                    &#9733;&#9733;&#9733;&#9733;&#9734;
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <img
                  src="/images/japaneseMinimalism.jpg"
                  className="card-img-top"
                  alt="Book Cover"
                />
                <div className="card-body">
                  <h5 className="card-title">Japanese Minimalism</h5>
                  <p className="card-text">Nicole Garrod</p>
                  <div className="rating">
                    &#9733;&#9733;&#9733;&#9733;&#9734;
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <img
                  src="/images/theAlchemist.jpg"
                  className="card-img-top"
                  alt="Book Cover"
                />
                <div className="card-body">
                  <h5 className="card-title">The Alchemist</h5>
                  <p className="card-text">Paulo Coelho</p>
                  <div className="rating">
                    &#9733;&#9733;&#9733;&#9733;&#9734;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="gallery" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Our Facilities</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <img
                src={"/images/studySpaces.jpg"}
                className="img-fluid rounded"
                alt="Facility"
              />
            </div>
            <div className="col-md-4">
              <img
                src={"/images/multiMediaRoom.jpg"}
                className="img-fluid rounded"
                alt="Facility"
              />
            </div>
            <div className="col-md-4">
              <img
                src={"/images/readingBook.jpg"}
                className="img-fluid rounded"
                alt="Facility"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Contact Us</h2>
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your name"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="favoriteBook" className="form-label">
                Favorite Book
              </label>
              <input
                type="text"
                className="form-control"
                id="favoriteBook"
                placeholder="e.g. Harry Potter"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                placeholder="Your message..."
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white text-center py-4">
        <div className="container">
          <p>FPT University Danang | 1234567890 | library@dream.edu</p>
          <div>
            <a href="/" className="text-white me-3">
              <i className="bi bi-book"></i>
            </a>
            <a href="/" className="text-white me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="mailto:library@dream.edu" className="text-white">
              <i className="bi bi-envelope"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
