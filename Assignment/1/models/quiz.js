const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  title: {
    type: String,
    required: [true, "Quiz title is required!"],
  },
  description: {
    type: String,
    default: "",
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
