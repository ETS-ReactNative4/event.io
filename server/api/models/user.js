const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  friends: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  ]
})

UserSchema.pre('save', function(next) {
  if (this.isNew) {
    if (!this.picture) {
      this.picture = `https://fakeimg.pl/100x100/333/?text=${this.username[0].toUpperCase()}&font=noto`
    }
    bcrypt.hash(this.password, 10, (err, encrypted) => {
      if (err) throw err
      this.password = encrypted
      next()
    })
  } else {
    next()
  }
})
const User = mongoose.model('User', UserSchema)
module.exports = User
