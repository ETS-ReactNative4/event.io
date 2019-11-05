const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Comment',
    default: null
  },
  replies: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment'
    }
  ],
  body: {
    type: String,
    required: true
  },
  likes: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
