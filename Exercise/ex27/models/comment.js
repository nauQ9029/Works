const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema({
    body: {
        type: String,
        require: [true, 'Comment body is required.']
    },
    date: {
        type: Date,
        default: Date.now
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;