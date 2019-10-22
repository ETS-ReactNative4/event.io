const mongoose = require('mongoose');

const FriendsSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  friends: [
    {
      type: mongoose.SchemaTypes.ObjectId
    }
  ]
});

const Friends = mongoose.model('Friends', FriendsSchema);

module.exports = Friends;
