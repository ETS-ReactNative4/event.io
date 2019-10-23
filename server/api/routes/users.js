const router = require('express').Router()
const db = require('../models')

router.get('/', async (req, res) => {
  const users = await db.User.find({}).select('username _id picture')
  res.json(users)
})

module.exports = router
