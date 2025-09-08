const express = require("express");
const mongoose = require("mongoose");
const Article = require("../models/article");
const router = express.Router();

articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));
articleRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const article = await Article.find();
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const article = new Article(req.body);
      await article.save();
      res.status(201).json(article);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      res.status(403).json("PUT operation not supported on /articles");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await Article.deleteMany({});
      res.status(200).send("All articles deleted successfully");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

articleRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      res
        .status(403)
        .json("POST operation not supported on /articles/" + req.params.id);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const article = await Article.findByIdAndDelete(req.params.id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = articleRouter;
