require('dotenv').config()
const jwt = require('jsonwebtoken')

function unauthorized(res) {
  res.status(401).json({ message: 'Unauthorized' })
}

module.exports = (req, res, next) => {
  if (!req.headers.authorization) return unauthorized(res)
  try {
    const bearerToken = req.headers.authorization.split(' ')
    if (bearerToken[0] === 'Bearer') {
      const token = bearerToken[1]
      decoded = jwt.verify(token, process.env.API_KEY)
      req.user = decoded
      next()
    } else {
      return unauthorized(res)
    }
  } catch (err) {
    unauthorized(res)
  }
}
