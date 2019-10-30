const mongoose = require('mongoose')

const FriendsSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  friends: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  ]
})

const Friends = mongoose.model('Friends', FriendsSchema)
module.exports = Friends
