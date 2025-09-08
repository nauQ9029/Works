const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  text: {
    type: String,
    required: [true, "Text is required!"],
    validate: {
      validator: function (value) {
        return value.length >= 10;
      },
      message: "Question must be at least 10 characters long!",
    },
  },
  options: {
    type: [String],
    required: [true, "Answer must provided!"],
    validate: [(arr) => arr.length > 0, "Options array must not be empty!"],
  },
  keywords: {
    type: [String],
    default: [],
  },
  correctAnswerIndex: {
    type: Number,
    required: [true, "Correct answer must provided!"],
    validate: {
      validator: function (value) {
        return this.options && value >= 0 && value < this.options.length;
      },
      message:
        "Correct answer index must be within the bounds of the options array!",
    },
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz", // reference to the Quiz model
  },
});

module.exports = mongoose.model("Question", questionSchema);
