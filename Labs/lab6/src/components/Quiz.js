import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizQuestions, setUserAnswer } from '../redux/Slices/quizSlice';
import QuizNavigation from './QuizNavigation';
import '../App.css';

const Quiz = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.quiz.questions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const userAnswers = useSelector((state) => state.quiz.userAnswers);

    useEffect(() => {
        dispatch(fetchQuizQuestions());
    }, [dispatch]);

    const handleAnswerClick = (answer) => {
        dispatch(setUserAnswer({ questionId: questions[currentQuestionIndex].id, answer }));
    };

    const goToFirstQuestion = () => setCurrentQuestionIndex(0);
    const goToPreviousQuestion = () => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    const goToNextQuestion = () => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
    const goToLastQuestion = () => setCurrentQuestionIndex(questions.length - 1);

    if (!questions.length) return <div className="loading">Loading...</div>;

    return (
        <div className="quiz-container">
            <h1 className="quiz-title">JavaScript Quiz</h1>
            <p className="question">{`Q${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].question}`}</p>

            <div className="options-container">
                {questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(option)}
                        className={`answer-option ${userAnswers[questions[currentQuestionIndex].id] === option ? 'selected' : ''}`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="question-navigation">
                <button onClick={goToFirstQuestion}>First</button>
                <button onClick={goToPreviousQuestion}>Prev</button>
                <button onClick={goToNextQuestion}>Next</button>
                <button onClick={goToLastQuestion}>Last</button>
            </div>

            <QuizNavigation />
        </div>
    );
};

export default Quiz;