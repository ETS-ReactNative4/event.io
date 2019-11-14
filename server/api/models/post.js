const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Post',
    default: null
  },
  feed: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Feed',
    required: true
  },
  likes: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'User', default: [] }
  ],
  comments: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'Post', default: [] }
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

module.exports = mongoose.model('Post', PostSchema)
