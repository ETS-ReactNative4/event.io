const appconfig = require('../../appconfing')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const tokenDuration = '1d'

module.exports = {
  sign(payload) {
    return jwt.sign(payload, appconfig.API_KEY, {
      expiresIn: tokenDuration,
    })
  },
  decode(token) {
    return jwt.verify(token, appconfig.API_KEY)
  },
  compareHash(original, hash) {},
}
