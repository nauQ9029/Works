/*
 * Quiz Controller
 * This controller handles the CRUD operations for quizz.
 */
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const mongoose = require("mongoose");

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
};

// Get a quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    console.log(" >>> [DEBUG] Incoming quiz ID:", req.params.quizId);
    console.log(" >> [DEBUG] Registered Models:", mongoose.modelNames());

    const quiz = await Quiz.findById(req.params.quizId).populate("questions").lean();

    const questions = await Question.find({ _id: { $in: quiz.questions } });
    console.log("quiz.questions:", quiz.questions);
    console.log(
      "types:",
      quiz.questions.map((q) => typeof q)
    );
    const question = await Question.findById("682e3fcd96e3d449c28c068b");
    console.log(">>> Found question?", question);

    console.log(" >>> [DEBUG] Manual Questions:", questions);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    console.log(" >>> [DEBUG] Populated Quiz:", JSON.stringify(quiz, null, 2));

    // Filter out any null values caused by missing/deleted questions
    quiz.questions = quiz.questions.filter((q) => q !== null);
    res.json(quiz);
  } catch (err) {
    console.error("Error fetching quiz:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new quiz
exports.createQuiz = async (req, res) => {
  const newQuiz = await Quiz.create(req.body);
  res.status(201).json(newQuiz);
};

// Update a quiz by ID
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a quiz by ID
exports.deleteQuiz = async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.quizId);
  res.json({ message: "Quiz deleted" });
};

// Search quizzes by keyword
exports.findQuestionsByKeyword = async (req, res) => {
  const mongoose = require("mongoose");
  try {
    const { keyword } = req.query; // keyword sent as a query string param
    const { quizId } = req.params; // quizId from route parameter

    if (!keyword) {
      return res
        .status(400)
        .json({ error: "Keyword query parameter is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: "Invalid quiz ID" });
    }

    const quiz = await Quiz.findById(quizId).populate({
      path: "questions",
      match: { keywords: keyword },
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json(quiz.questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add question(s) to a quiz
exports.addQuestionToQuiz = async (req, res) => {
  try {
    console.log(" >>> [DEBUG] REQ.BODY:", req.body);
    const { questionIds } = req.body; // expected to be an array of MongoDB ObjectId strings

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Provide an array of question IDs." });
    }

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      // adds values only if they do not already exist in the array avoid duplicate question ids
      // repeats the operation to multiple values at once
      { $addToSet: { questions: { $each: questionIds } } },
      { new: true }
    ).populate("questions"); // fetches full Question objects

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json(quiz);
  } catch (error) {
    console.error("Error adding questions to quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
