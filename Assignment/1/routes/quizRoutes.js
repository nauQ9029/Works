const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const Quiz = require("../models/quiz");

router.get("/", quizController.getAllQuizzes);
router.get("/:quizId", quizController.getQuizById);
router.get("/:quizId/search", quizController.findQuestionsByKeyword);
router.post("/", quizController.createQuiz);
router.put("/:quizId", quizController.updateQuiz);
router.delete("/:quizId", quizController.deleteQuiz);
router.post("/:quizId/question", quizController.addQuestionToQuiz);

router.get("/debug/:id", async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate("questions");
  console.log(">>> Raw Quiz:", quiz);
  res.json(quiz);
});

// router.post("/test", (req, res) => {
//   console.log("Test route - req.body:", req.body);
//   res.json({ received: req.body });
// });

module.exports = router;
