const validateArticle = async (req, res, next) => {
  const { title, date, text } = req.body;
  if (!title || !date || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  next();
};

// 2.2.	Exercise 2: create a middleware function that validate the format of the date field.
const validateDateFormat = (req, res, next) => {
  const { date } = req.body;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!date || !dateRegex.test(date)) {
    return res
      .status(400)
      .json({ error: "Invalid or missing date format (YYYY-MM-DD required)" });
  }
  next();
};

// 2.3.	Exercise 3: create a middleware function that ensure a text field meets certain length requirements
const validateTextLength = (req, res, next) => {
  const { text } = req.body;

  if (!text || text.length < 20) {
    return res
      .status(400)
      .json({ error: "Text is too short (minimum 20 characters)" });
  }

  if (text.length > 1000) {
    return res
      .status(400)
      .json({ error: "Text is too long (maximum 1000 characters)" });
  }

  next();
};

module.exports = {
  validateArticle,
  validateDateFormat,
  validateTextLength,
};
