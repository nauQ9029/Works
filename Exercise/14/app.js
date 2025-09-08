const mongoose = require("mongoose");
const Article = require("./models/article");
mongoose.set("strictQuery", true);

const URL = "mongodb://localhost:27017/newspapers";
const connect = mongoose.connect(URL);

const newArticle = new Article({
  title: "My First Article",
  date: new Date(),
  text: "Short article text about first article.",
  comments: [
    { body: "Great article!", date: new Date() },
    { body: "Thanks for sharing!", date: new Date() },
  ],
  tags: ["first", "article"],
});

newArticle
  .save()
  .then(doc => {
    console.log('Article saved successfully!', doc);
  })
  .catch((error) => {
    console.error("Error saving article:", error.message);
  })
  .finally(() => {
    mongoose.connection.close();
  });
