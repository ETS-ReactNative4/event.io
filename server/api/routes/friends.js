const router = require('express').Router()
const db = require('../models')
const authCheck = require('../middleware/jwtCheck')

// get list of friendssw
router.get('/', authCheck, async (req, res) => {
  try {
    const friends = await db.FriendRequest.find()
      .or([{ from: req.user.uid, accepted: true }, { to: req.user.uid, accepted: true }])
      .populate('from to', '-email -password')
    res.json(friends)
  } catch (err) {
    console.error(err)
    res.json.status(500).end()
  }
})

// get all your friend requests
router.get('/requests', authCheck, async (req, res) => {
  try {
    const friendRequests = await db.FriendRequest.find()
      .or([{ from: req.user.uid }, { to: req.user.uid }])
      .populate('from to', '-password -email')
    res.json(friendRequests)
  } catch (err) {
    console.error(err)
    res.json.status(500).end()
  }
})
// send a friend req
router.post('/requests', authCheck, async (req, res) => {
  try {
    const { to } = req.body
    const exists = await db.FriendRequest.findOne({ to, from: req.user.id })
    if (exists) return res.json({ message: 'request already sent' })
    const friendRequest = await db.FriendRequest.create({ to, from: req.user.uid, accepted: false })
    res.json(friendRequest)
  } catch (err) {
    console.error(err)
    res.json.status(500).end()
  }
})

// accept or decline friend req
router.post('/requests/:id', authCheck, async (req, res) => {
  try {
    const { accepted } = req.body
    if (!accepted) {
      db.FriendRequest.deleteOne({ _id: req.params.id, to: req.user.uid })
      res.json({ message: 'Request has been declined' })
    } else {
      db.FriendRequest.updateOne({ _id: req.params.id, to: req.user.uid, accepted: true })
      res.json({ message: 'Request has been approved' })
    }
  } catch (err) {
    console.error(err)
    res.json.status(500).end()
  }
})

module.exports = router
