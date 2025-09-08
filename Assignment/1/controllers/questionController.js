/* 
    Question Controller
    This controller handles the CRUD operations for questions.
*/
const Question = require("../models/question");

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("quiz");
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId).populate(
      "quiz"
    );
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  } catch (err) {
    console.error("Error fetching question:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswerIndex, quizId } = req.body;

    const question = await Question.create({
      text,
      options,
      correctAnswerIndex,
      quiz: quizId,
    });

    res.status(201).json(question);
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a question by ID
exports.updateQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswerIndex, quizId } = req.body;

    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    question.set({
      text,
      options,
      correctAnswerIndex,
      quiz: quizId,
    });

    await question.save(); // triggers full schema validation

    res.json(question);
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
  await Question.findByIdAndDelete(req.params.questionId);
  res.json({ message: "Question deleted" });
};
