require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt')
const db = require('../models')
const jwt = require('jsonwebtoken')

const tokenDuration = '1d'

function unauthorized(res) {
  res.status(401).json({ message: 'Unauthorized' })
}

router.post('/refresh', async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.API_KEY)
    const { email, uid, username } = decoded
    const token = jwt.sign({ email, uid, username }, process.env.API_KEY, {
      expiresIn: tokenDuration
    })
    res.json({ token, user: { email, uid, username } })
  } catch (err) {
    console.log(JSON.stringify(err, null, 2))
    unauthorized(res)
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await db.User.findOne({ email })
  if (!user) {
    console.log('No user found')
    return unauthorized(res)
  }

  bcrypt.compare(password, user.password, (err, same) => {
    if (err || !same) return unauthorized(res)
    const payload = {
      uid: user._id,
      username: user.username,
      picture: user.picture,
      friends: user.friends
    }
    const token = jwt.sign(payload, process.env.API_KEY, {
      expiresIn: tokenDuration
    })
    res.json({ token, user: payload })
  })
})

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body
  const userExists = await db.User.findOne({ email })
  if (userExists) return res.status(304).end()
  const user = await db.User.create({
    username,
    email,
    password,
    friends: []
  })
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    picture: user.picture
  })
})

module.exports = router
