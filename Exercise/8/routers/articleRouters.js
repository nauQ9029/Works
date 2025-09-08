const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  try {
    const { title, date, content, author } = req.body;

    if (!title || !date || !content || !author) {
      const error = new Error("Missing required article fields");
      error.status = 400;
      throw error;
    }

    res.status(201).json({ message: "Article saved successfully" });
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Article ID is required");
    }
    res.status(200).json({ message: `Deleting article: ${id}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
