const router = require('express').Router()
const db = require('../models')
const authCheck = require('../middleware/jwtCheck')

// get list of friendssw
router.get('/', authCheck, async (req, res) => {
  try {
    const friends = await db.Friends.find({ user: req.user.uid }).populate(
      'friends',
      '-email -password'
    )
    res.json(friends)
  } catch (err) {
    console.error(err)
    res.json.status(500).end()
  }
})

// get all your friend requests
router.get('/requests', authCheck, async (req, res) => {
  try {
    const friendRequests = await db.FriendRequest.find({ to: req.user.uid }).populate(
      'from to',
      '-password -email'
    )
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

    let exists = await db.FriendRequest.findOne().or(
      { to: to, from: req.user.uid },
      { to: req.user.uid, from: to }
    )

    if (exists) return res.json({ message: 'request already sent' })
    exists = await db.Friends.findOne({ user: req.user.uid })

    const friendRequest = await db.FriendRequest.create({
      to,
      from: req.user.uid,
      accepted: false
    })
    // emit event
    const socketId = req.sockets[to]
    if (socketId) {
      req.io.to(socketId).emit('friendRequest')
    }
    res.json(friendRequest)
    // socket.emit('friendrequest/${user.uid}')
  } catch (err) {
    console.error(err)
    res.json.status(500).end()
  }
})

// accept or decline friend req
router.put('/requests/:id', authCheck, async (req, res) => {
  try {
    const { accepted } = req.body
    // get friend request.
    const friendRequest = await db.FriendRequest.findById(req.params.id)
    if (accepted) {
      await db.Friends.findOneAndUpdate(
        { user: friendRequest.from },
        { $push: { friends: friendRequest.to } }
      )
      await db.Friends.findOneAndUpdate(
        { user: friendRequest.to },
        { $push: { friends: friendRequest.from } }
      )
    }
    db.FriendRequest.findOneAndDelete({ _id: req.params.id })
    const socketId = req.sockets[req.user.uid]
    if (socketId) {
      req.io.to(socketId).emit('friendRequest')
    }
    res.json({ message: 'updated req' })
  } catch (err) {
    console.error(err)
    res.json.status(500).end()
  }
})

module.exports = router
