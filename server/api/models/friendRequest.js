const mongoose = require('mongoose');

const FriendRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true
  },
  friendRequests: [
    {
      from: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      },
      accepted: {
        type: Boolean,
        default: false
      }
    }
  ]
});

const FriendRequest = mongoose.model('FriendRequest', FriendRequestSchema);
module.exports = FriendRequest;
