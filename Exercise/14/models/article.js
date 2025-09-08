const { text } = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, "Article title is required"],
    minlength: [5, "Article title must be at least 5 characters long"],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Article date is required"],
  },
  text: {
    type: String,
    required: [true, "Article text is required"],
    validate: {
      validator: function (v) {
        return v.length >= 10;
      },
      message: "Article text must be at least 10 characters long",
    },
  },
  comments: [
    {
      body: {
        type: String,
        required: [true, "Comment body is required"],
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  tags: {
    type: [String],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "There should be at least 1 tags",
    },
  },
});
const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
