import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizNavigation = () => {
    const navigate = useNavigate();

    const handleQuizClick = () => navigate('/quiz');                // Redirect to quiz page
    const handleQuizReviewClick = () => navigate('/quiz/review');   // Redirect to quiz review page
    const handleSubmitClick = () => navigate('/quiz/result');       // Redirect to results page

    return (
        <div className='quiz-navigation'>
            <button onClick={handleQuizClick}>Quiz</button>
            <button onClick={handleQuizReviewClick}>Quiz Review</button>
            <button onClick={handleSubmitClick}>Submit</button>
        </div>
    );
};

export default QuizNavigation;
