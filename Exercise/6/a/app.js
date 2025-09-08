var express = require("express");
const app = express();
const PORT = 8080;
const articles = require("./articles");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/articles", async (req, res) => {
  try {
    res.status(200).json(articles);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/articles/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const article = articles.find((article) => article.id === id);
    if (!article) {
      res.status(404).send("Article not found");
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.post("/articles", (req, res) => {
  const newArticle = {
    id: articles.length + 1,
    title: req.body.title,
    date: req.body.date,
    text: req.body.text,
  };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

app.put("/articles/:id", (req, res) => {
  const index = articles.findIndex(
    (article) => article.id === parseInt(req.params.id)
  );
  if (index === -1) return res.status(404).send("Article not found");
  articles[index] = {
    ...articles[index],
    ...req.body
  };
  res.json(articles[index]);
});

app.delete("/articles/:id", (req, res) => {
  const index = articles.findIndex(
    (article) => article.id === parseInt(req.params.id)
  );
  if (index === -1) return res.status(404).send("Article not found");
const deletedArticles =articles.splice(index, 1);
res.status(204).json(deletedArticles);
});

app.listen(PORT, () => {
  console.log(`Example app is listening at http://localhost:${PORT}`);
});
module.exports = app;
