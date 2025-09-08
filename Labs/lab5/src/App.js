import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <img src="/images/logo_fpt.jpg" alt="FPT University Logo" className="header-logo" />
            <nav className="header-nav">
              <Link to="/" className="header-link">Home</Link>
              <Link to="/chat" className="header-link">Chat Room</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>

        <footer className="app-footer">
          <p>&copy; 2024 - Created by FPTU</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
