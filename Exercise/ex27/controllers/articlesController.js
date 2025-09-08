const Article = require('../models/article');
//token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTQ3ODI3NTM1MzE0MjcyOCIsInVzZXJuYW1lIjoiSHXhu7NuaCBUaGnDqm4iLCJpYXQiOjE3NTAzMjY1NTcsImV4cCI6MTc1MDMzMDE1N30.Yg1GXsdMCoBs8DkZkEOfrsYrYoQbq7yenL7osEiFHr0

// GET /articles (Public)
exports.findAll = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch articles', error: err.message });
  }
};

// GET /articles/:id (Public)
exports.findById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /articles (Protected)
exports.create = async (req, res) => {
  try {
    const article = new Article({
      ...req.body,
      createdBy: req.user.username, // add info from JWT token
      facebookId: req.user.facebookId // optionally store user ID
    });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /articles/:id (Protected)
exports.update = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /articles/:id (Protected)
exports.delete = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(204).send(); // No Content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
