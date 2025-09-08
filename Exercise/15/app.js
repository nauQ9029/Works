const mongoose = require("mongoose");
const Article = require("./models/article");
mongoose.set("strictQuery", true);

const URL = "mongodb://localhost:27017/newspapers";
const connect = mongoose.connect(URL);

const newArticle = new Article({
  title: "My Second Article",
  date: new Date(),
  text: "Short article text about second article.",
  comments: [
    { body: "Good!", date: new Date() },
    { body: "Bad :(", date: new Date() },
  ],
  tags: ["first", "article", "news"],
});

newArticle
  .save()
  .then((doc) => {
    console.log("Article saved successfully!", doc);
  })
  .catch((error) => {
    console.error("Error saving article:", error.message);
  })
  .finally(() => {
    mongoose.connection.close();
  });
