const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [5, 'Title must be at least 5 characters long'],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Article date is required']
  },
  text: {
    type: String,
    required: [true, 'Article text is required'],
    validate: {
      validator: function (v) {
        return v.length > 10;
      },
      message: 'Article text must be longer than 10 characters'
    }
  },
  tags: {
    type: [String],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'There should be at least one tag.'
    }
  },
  createdBy: {
    type: String,
    required: true
  },
  facebookId: {
    type: String,
    required: true
  }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
