const router = require('express').Router()
const db = require('../models')
const jwtCheck = require('../middleware/jwtCheck')

router.get('/', jwtCheck, async (req, res) => {
  const q = req.query.q
  if (!q) return res.json([])
  const regex = new RegExp(`^${q}`, 'i')
  let users = await db.User.find({ username: regex }).select('username _id picture')
  users = users.filter(val => val.username !== req.user.username)
  res.json(users)
})

module.exports = router
