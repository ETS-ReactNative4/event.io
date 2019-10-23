const mongoose = require('mongoose')

const FriendRequestSchema = new mongoose.Schema({
  from: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  accepted: {
    type: Boolean,
    default: false
  }
})

const FriendRequest = mongoose.model('FriendRequest', FriendRequestSchema)
module.exports = FriendRequest
