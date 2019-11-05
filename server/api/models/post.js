const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  public: {
    type: Boolean,
    default: false,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Post' }],
  comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);
