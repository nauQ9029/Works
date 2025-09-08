import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Home = () => {
    return <h2>Home Page</h2>
};
const About = () => {
    return <h2>About Page</h2>
};
const Contact = () => {
    return <h2> Contact Page</h2>
};

const DemoRouter = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/">About</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/">Contact</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/" element={<About />}/>
                <Route path="/" element={<Contact />}/>
            </Routes>
        </Router>
    );
};
export default DemoRouter;