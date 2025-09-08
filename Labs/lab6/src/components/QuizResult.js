import React from 'react';
import { useSelector } from 'react-redux';
import QuizNavigation from './QuizNavigation';
import '../App.css';

const QuizResult = () => {
    const questions = useSelector((state) => state.quiz.questions);
    const userAnswers = useSelector((state) => state.quiz.userAnswers);

    if (!questions.length) return <div>Loading...</div>;

    return (
        <div className="quiz-container">
            <h1>Quiz Result</h1>
            <ul>
                {questions.map((question, index) => {
                    const userAnswer = userAnswers[question.id];
                    const isCorrect = userAnswer === question.correctAnswer;

                    return (
                        <li key={question.id} style={{ marginBottom: '20px' }}>
                            <p>{`Q${index + 1}: ${question.question}`}</p>
                            <p>Your answer: <strong>{userAnswer || "Not answered"}</strong></p>
                            {isCorrect ? (
                                <p style={{ color: 'green' }}>Correct!</p>
                            ) : (
                                <>
                                    <p style={{ color: 'red' }}>Incorrect</p>
                                    <p>Correct answer: <strong>{question.correctAnswer}</strong></p>
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default QuizResult;