const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Post',
    default: null
  },
  children: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Post', default: [] }],
  likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', default: [] }],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    latitude: Number,
    longitude: Number
  },
  public: {
    type: Boolean,
    default: false,
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
