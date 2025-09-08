import React from 'react';
import { useSelector } from 'react-redux';
import QuizNavigation from './QuizNavigation';
import '../App.css';

const QuizReview = () => {
    const questions = useSelector((state) => state.quiz.questions);
    const userAnswers = useSelector((state) => state.quiz.userAnswers);

    if (!questions.length) return <div>Loading...</div>;

    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(userAnswers).length;

    return (
        <div className="quiz-container">
            <h1>Quiz Review</h1>
            <p>Total Questions: {totalQuestions}</p>
            <p>Questions Answered: {answeredQuestions}</p>
            <p>Questions Unanswered: {totalQuestions - answeredQuestions}</p>
            <ul>
                {questions.map((question, index) => (
                    <li key={question.id} style={{ marginBottom: '10px' }}>
                        <p>{`Q${index + 1}: ${question.question}`}</p>
                        <p>Your answer: <strong>{userAnswers[question.id] || "Not answered"}</strong></p>
                    </li>
                ))}
            </ul>

            <QuizNavigation />
        </div>
    );
};

export default QuizReview;