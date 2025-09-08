const express = require("express");
const exphbs = require("express-handlebars");
const articles = require("./models/articles");

const PORT = 8080;
const app = express();

// Set up Handlebars with helper
const hbs = exphbs.create({
  helpers: {
    formatDate: (date) => new Date(date).toLocaleDateString(),
  },
  partialsDir: ["views/partials"],
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));

// Home routes
app.get("/", (req, res) => {
  // res.render("home", { title: "Home", message: "Goodbye, World!" });
  res.render("home", { title: "Home", articles });
});

// Article detail routes
app.get("/articles/:id", (req, res) => {
  const articleId = parseInt(req.params.id);
  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return res.status(404).send("Article not found");
  }

  res.render("article", { title: article.title, ...article });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
