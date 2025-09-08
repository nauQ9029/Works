const express = require("express");
const articleController = require("../controllers/articleController");
const articleRouter = express.Router();
const auth = require("../authentication/auth");

articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));

console.log(typeof auth.isAuthenticated_Session); // should log 'function'
console.log(typeof (async (req, res) => {})); // should also log 'function'

articleRouter.get("/", auth.isAuthenticated_Session, articleController.findAll);
articleRouter
  .route("/", auth.isAuthenticated_Session)
  .post(articleController.create)
  .put((req, res) => {
    res.status(403).json("PUT operation not supported on /articles");
  })
  .delete(articleController.delete);

articleRouter
  .route("/:id")
  .get(articleController.findById)
  .post(auth.isAuthenticated_Session, (req, res) => {
    res
      .status(403)
      .json("POST operation not supported on /articles/" + req.params.id);
  })
  .put(auth.isAuthenticated_Session, articleController.update)
  .delete(auth.isAuthenticated_Session, articleController.delete);

module.exports = articleRouter;
