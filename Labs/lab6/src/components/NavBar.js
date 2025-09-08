import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/news" className="nav-link">News</NavLink>
            <NavLink to="/quiz" className="nav-link">Quiz</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </nav>
    );
};

export default Navbar;
