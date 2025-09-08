const express = require("express");
const articleController = require("../controllers/articleController");
const { verifyUser } = require("../config/jwtConfig");
const articleRouter = express.Router();
const passport = require("passport");

articleRouter
  .route("/")
  .get(articleController.findAll) // public
  .post(verifyUser, articleController.create) // protected
  .put((req, res) => {
    res.status(403).json("PUT not supported");
  })
  .delete(passport.verifyUser, articleController.delete); // protected

articleRouter
  .route("/:id")
  .get(articleController.findById)
  .put(passport.verifyUser, articleController.update) // protected
  .delete(verifyUser, articleController.delete); // protected

module.exports = articleRouter;
