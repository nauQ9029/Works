const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  try {
    const { title, date, content, author, video } = req.body;

    if (!title || !date || !content || !author || !video) {
      const error = new Error("Missing required video fields");
      error.status = 400;
      throw error;
    }

    res.status(201).json({ message: "Video saved successfully" });
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("Missing video ID");
      error.status = 400;
      throw error;
    }

    res
      .status(200)
      .json({ message: `Video with ID ${id} deleted successfully` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
