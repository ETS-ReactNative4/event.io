require('dotenv').config()
const router = require('express').Router()
const db = require('../models')
const encryption = require('../services/encryption')

function unauthorized(res) {
  res.status(401).json({ message: 'Unauthorized' })
}

router.post('/refresh', async (req, res) => {
  try {
    const { email, uid, username } = encryption.decode(req.body.token)
    const token = encryption.sign({ email, uid, username })
    res.json({ token, user: { email, uid, username } })
  } catch (err) {
    unauthorized(res)
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await db.User.findOne({ email })
  if (!user) {
    console.log('user does not exist')
    return unauthorized(res)
  }
  try {
    const validPassword = await encryption.compareHash(
      password,
      user.password
    )
    if (!validPassword) {
      return unauthorized(res)
    } else {
      const token = encryption.sign({
        uid: user._id,
        username: user.username,
        picture: user.picture,
        friends: user.friends,
      })
      res.json({ token, user: payload })
    }
  } catch (err) {
    console.log(err)
    return unauthorized(res)
  }
})

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body
  const userExists = await db.User.findOne({ email })
  if (userExists) return res.status(400).end()
  const user = await db.User.create({
    username,
    email,
    password,
    friends: [],
  })
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    picture: user.picture,
  })
})

module.exports = router
