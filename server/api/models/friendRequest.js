const mongoose = require('mongoose');

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
    default: null,
    required: true
  },
  closed: {
    type: Boolean,
    default: false,
    required: true
  },
  resolvedAt: {
    type: Date,
    default: null
  },
  issuedAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const FriendRequest = mongoose.model('FriendRequest', FriendRequestSchema);
module.exports = FriendRequest;
