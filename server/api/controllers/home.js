const router = require('express').Router()
const db = require('../models')
const tokenCheck = require('../middleware/tokenCheck')

router.get('/', tokenCheck, async (req, res) => {
  try {
    const user = await db.User.findById(req.user.uid)
    user.friends.push(req.user.uid)
    const posts = await db.Post.find({
      user: { $in: user.friends },
      parent: null
    })
      .populate('user', '-email -password')
      .sort({ _id: -1 })
    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

module.exports = router
