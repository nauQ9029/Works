const express = require("express");
const app = express();
const PORT = 8080;
const {
  validateArticle,
  validateDateFormat,
  validateTextLength,
} = require("./middleware/articlesValidators");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/articles", async (req, res) => {
  try {
    res.status(200).end("Will send all t he articles to you!");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post(
  "/articles",
  validateArticle,
  validateDateFormat,
  validateTextLength,
  (req, res) => {
    try {
      res
        .status(201)
        .end(
          "Will add the article: " +
            req.body.title +
            " with details: " +
            req.body.text
        );
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

app.put("/articles", async (req, res) => {
  try {
    res.status(200).end("PUT operation not supported on /articles");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.delete("/articles", async (req, res) => {
  try {
    res.status(200).end("Deleting all articles");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/articles/:id", async (req, res) => {
  try {
    res
      .status(200)
      .end("Will send details of the article: " + req.params.id + " to you!");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.post("/articles/:id", async (req, res) => {
  try {
    res
      .status(200)
      .end("POST operation not supported on /articles/" + req.params.id);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.put("/articles/:id", async (req, res) => {
  try {
    res.write("Updating article: " + req.params.id + "\n");
    res
      .status(200)
      .end(
        "Will update the article: " +
          req.params.id +
          " with details: " +
          req.body.text
      );
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.delete("/articles/:id", async (req, res) => {
  try {
    res.status(200).end("Deleting article: " + req.params.id);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
