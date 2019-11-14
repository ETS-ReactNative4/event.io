const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Comment',
    default: null
  },
  replies: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'Comment', default: [] }
  ],
  likes: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'User', default: [] }
  ],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Comment', CommentSchema)
