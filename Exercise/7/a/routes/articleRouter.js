const express = require("express");
const articles = require("../articles");    // Missing import data .js file in document
const articleRouter = express.Router();
articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));
articleRouter
  .route("/")

  .get(async (req, res) => {
    try {
      res.status(200).json(articles);
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  })
  .post(async (req, res) => {
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
  })
  .put(async (req, res) => {
    try {
      res.status(200).end("PUT operation not supported on /articles");
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  })
  .delete(async (req, res) => {
    try {
      res.status(200).end("Deleting all articles");
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });

articleRouter
  .route("/:id")

  .get(async (req, res) => {
    try {
      res
        .status(200)
        .end("Will send details of the article: " + req.params.id + " to you!");
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  })
  .post(async (req, res) => {
    try {
      res
        .status(200)
        .end("POST operation not supported on /articles/" + req.params.id);
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  })
  .put(async (req, res) => {
    try {
      res.write("Updating article: " + req.params.id + "\n");
      res
        .status(201)
        .end(
          "Will update the article: " +
            req.params.id +
            " with details: " +
            req.body.text
        );
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  })
  .delete(async (req, res) => {
    try {
      res.status(200).end("Deleting article: " + req.params.id);
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });

module.exports = articleRouter;
