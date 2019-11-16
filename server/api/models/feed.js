const mongoose = require('mongoose')

const FeedSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  thumbnail: {
    type: String
  },
  subscribers: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'User', default: [] }
  ],
  posts: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'Post', default: [] }
  ],
  location: {
    latitude: Number,
    longitude: Number
  },
  address: {
    type: String
  },
  audience: {
    type: String,
    default: 'private',
    required: true
  },
  invites: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  ],
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Feed', FeedSchema)
