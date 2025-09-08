const express = require("express");
const axios = require("axios");
const router = express.Router();

const axiosInstance = axios.create();
const apiUrl = "http://localhost:8080";

router.get("/", async (req, res) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/questions`);
    res.render("questions/list.ejs", { questions: response.data });
  } catch (err) {
    res.status(500).send("Error fetching questions");
  }
});

// Create Question Form
router.get("/create", async (req, res) => {
  try {
    const quizzes = await axiosInstance.get(`${apiUrl}/quizzes`);
    res.render("questions/create.ejs", { quizzes: quizzes.data });
  } catch (err) {
    res.status(500).send("Error loading quizzes for question");
  }
});

// POST Create Question
router.post("/", async (req, res) => {
  try {
    const { text, quizId, correctAnswerIndex } = req.body;

    // Support both 'options' and 'options[]' (your browser submits 'options[]')
    const rawOptions = req.body["options[]"] || req.body.options || [];

    const filteredOptions = Array.isArray(rawOptions)
      ? rawOptions.filter((opt) => opt && opt.trim() !== "")
      : [];

    const index = Number(correctAnswerIndex);

    // Debugging logs
    console.log("RAW BODY:", req.body);
    console.log("FILTERED OPTIONS:", filteredOptions);
    console.log("correctAnswerIndex:", index);

    // Validation
    if (!filteredOptions || filteredOptions.length === 0) {
      return res.status(400).send("At least one non-empty option is required.");
    }
    if (isNaN(index) || index < 0 || index >= filteredOptions.length) {
      return res.status(400).send("Correct answer index is out of bounds.");
    }

    const payload = {
      text,
      options: filteredOptions,
      correctAnswerIndex: index,
      quizId,
    };

    console.log("FINAL PAYLOAD:", payload);

    await axiosInstance.post(`${apiUrl}/questions`, payload);
    res.redirect("/questions");
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).send("Error creating question");
  }
});

// Question Details
router.get("/:id", async (req, res) => {
  try {
    const response = await axiosInstance.get(
      `${apiUrl}/questions/${req.params.id}`
    );
    res.render("questions/details.ejs", { question: response.data });
  } catch (err) {
    res.status(500).send("Error loading question");
  }
});

// Edit Question Form
router.get("/:id/edit", async (req, res) => {
  try {
    const question = await axiosInstance.get(
      `${apiUrl}/questions/${req.params.id}`
    );
    const quizzes = await axiosInstance.get(`${apiUrl}/quizzes`);
    res.render("questions/edit.ejs", {
      question: question.data,
      quizzes: quizzes.data,
    });
  } catch (err) {
    res.status(500).send("Error loading question");
  }
});

// PUT Update Question
router.put("/:id", async (req, res) => {
  try {
    const { text, correctAnswerIndex, quizId } = req.body;

    const rawOptions = req.body["options[]"] || req.body.options || [];

    // Clean the options (remove empty strings)
    const filteredOptions = Array.isArray(rawOptions)
      ? rawOptions.filter((opt) => opt && opt.trim() !== "")
      : [];

    const index = Number(correctAnswerIndex);

    // Validation before sending to backend
    if (!filteredOptions.length) {
      return res.status(400).send("At least one option is required.");
    }
    if (isNaN(index) || index < 0 || index >= filteredOptions.length) {
      return res.status(400).send("Correct answer index is out of bounds.");
    }

    const payload = {
      text,
      options: filteredOptions,
      correctAnswerIndex: index,
      quizId,
    };

    console.log(" >>> [DEBUG] FINAL PUT payload:", payload);

    await axiosInstance.put(`${apiUrl}/questions/${req.params.id}`, payload);
    res.redirect("/questions");
  } catch (err) {
    console.error(
      "❌ Error updating question:",
      err.response?.data || err.message
    );
    res.status(500).send("Error updating question");
  }
});

// DELETE Question
router.delete("/:id", async (req, res) => {
  try {
    await axiosInstance.delete(`${apiUrl}/questions/${req.params.id}`);
    res.redirect("/questions");
  } catch (err) {
    res.status(500).send("Error deleting question");
  }
});

module.exports = router;
