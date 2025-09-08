import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import Navbar from './components/NavBar';
import Quiz from './components/Quiz';
import QuizReview from './components/QuizReview';
import QuizResult from './components/QuizResult';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/news" element={<div>News Page</div>} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/review" element={<QuizReview />} />
          <Route path="/quiz/result" element={<QuizResult />} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;