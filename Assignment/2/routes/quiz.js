const express = require("express");
const axios = require("axios");
const router = express.Router();

const axiosInstance = axios.create();
const apiUrl = "http://localhost:8080";

// GET All Quizzes
router.get("/", async (req, res) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/quizzes`);
    res.render("quiz/list.ejs", { quizzes: response.data });
  } catch (err) {
    res.status(500).send("Error fetching quizzes");
  }
});

// Create Quiz Form
router.get("/create", (req, res) => {
  res.render("quiz/create.ejs");
});

// POST Create Quiz
router.post("/", async (req, res) => {
  try {
    await axiosInstance.post(`${apiUrl}/quizzes`, req.body);
    res.redirect("/quizzes");
  } catch (err) {
    res.status(500).send("Error creating quiz");
  }
});

// Quiz Details
router.get("/:id", async (req, res) => {
  try {
    const response = await axiosInstance.get(
      `${apiUrl}/quizzes/${req.params.id}`
    );
    res.render("quiz/details.ejs", { quiz: response.data });
  } catch (err) {
    console.error("Error loading quiz:", err.response?.data || err.message);
    res.status(500).send("Error loading quiz");
  }
});

// Edit Quiz Form
router.get("/:id/edit", async (req, res) => {
  try {
    const response = await axiosInstance.get(
      `${apiUrl}/quizzes/${req.params.id}`
    );
    res.render("quiz/edit.ejs", { quiz: response.data });
  } catch (err) {
    res.status(500).send("Error loading quiz");
  }
});

// PUT Update Quiz
router.put("/:id", async (req, res) => {
  try {
    await axiosInstance.put(`${apiUrl}/quizzes/${req.params.id}`, req.body);
    res.redirect("/quizzes");
  } catch (err) {
    console.error("Update Quiz Error:", err.response?.data || err.message);
    res.status(500).send("Error updating quiz");
  }
});

// DELETE Quiz
router.delete("/:id", async (req, res) => {
  try {
    await axiosInstance.delete(`${apiUrl}/quizzes/${req.params.id}`);
    res.redirect("/quizzes");
  } catch (err) {
    res.status(500).send("Error deleting quiz");
  }
});

module.exports = router;
