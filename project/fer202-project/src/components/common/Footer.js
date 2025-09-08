import React from 'react';
import '../../styles/common/footer.css';

const Footer = () => {
  return (
    
<footer className="footer">
  <div className="footer-container">
    {/* <!-- Logo + Description --> */}
    <div className="footer-column logo-column">
      <h2 className="logo-text">Hat <span>De</span></h2>
      <p className="desc">
        Your one-stop destination for all wedding services and products. Making wedding planning simpler, more enjoyable, and stress-free.
      </p>
      <div className="social-icons">
        <i className="fab fa-instagram"></i>
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-youtube"></i>
      </div>
    </div>

    {/* <!-- Services --> */}
    <div className="footer-column">
      <h3>Services</h3>
      <ul>
        <li>Venues</li>
        <li>Photography</li>
        <li>Catering</li>
        <li>Beauty & Makeup</li>
        <li>Wedding Planning</li>
      </ul>
    </div>

    {/* <!-- Shop --> */}
    <div className="footer-column">
      <h3>Shop</h3>
      <ul>
        <li>Dresses</li>
        <li>Suits & Tuxedos</li>
        <li>Decorations</li>
        <li>Invitations</li>
        <li>Gifts & Favors</li>
      </ul>
    </div>

    {/* <!-- Company --> */}
    <div className="footer-column">
      <h3>Company</h3>
      <ul>
        <li>About Us</li>
        <li>Become a Vendor</li>
        <li>Blog</li>
        <li>Contact</li>
        <li>Help Center</li>
      </ul>
    </div>
  </div>

  {/* <!-- Newsletter --> */}
  <div className="newsletter">
    <div>
    <h3>Subscribe to our newsletter</h3>
    <p>Get wedding inspiration and special offers</p>
    </div>
    <form className="newsletter-form">
      <input type="email" placeholder="Your email address" required />
      <button type="submit">Subscribe</button>
    </form>
  </div>

  {/* <!-- Footer bottom --> */}
  <div className="footer-bottom">
    <p>© 2025 Hat De. All rights reserved.</p>
    <div className="footer-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Cookie Policy</a>
    </div>
  </div>
</footer>
  )
};

export default Footer;
