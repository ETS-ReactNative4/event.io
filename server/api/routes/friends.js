const router = require('express').Router()
const db = require('../models')
const tokenCheck = require('../middleware/tokenCheck')

router.get('/', tokenCheck, async (req, res) => {
  try {
    const friends = await db.User.findById(req.user.uid)
      .populate('friends', '-email -password -friends')
      .select('friends')
    res.json(friends)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

// get all requests that user has recieved
router.get('/requests', tokenCheck, async (req, res) => {
  try {
    const friendRequests = await db.FriendRequest.find({
      to: req.user.uid,
      closed: false
    }).populate('from to', '-password -email')
    res.json(friendRequests)
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

// get all requests that user has sent
router.get('/requests/sent', tokenCheck, async (req, res) => {
  try {
    const requests = await db.FriendRequest.find({
      from: req.user.id,
      closed: false
    }).populate('from to', '-password -email')
    res.json(requests)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

// create friend request
router.post('/requests', tokenCheck, async (req, res) => {
  try {
    const { to } = req.body
    // check if request already exists
    let exists = await db.FriendRequest.findOne({ to, from: req.user.uid })
    if (exists) return res.status(409).end()
    // check if already friends
    const user = await db.User.findById(req.user.uid)
    if (user.friends.includes(to)) return res.status(409).end()
    // create friend request
    const friendRequest = await db.FriendRequest.create({
      to,
      from: req.user.uid,
      accepted: false,
      issuedAt: Date.now()
    })
    // emit socket event to recepient
    const socketId = req.sockets[to]
    if (socketId) {
      req.io.to(socketId).emit('friendRequest')
    }
    // return created request
    res.status(201).json(friendRequest)
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

// accept or decline friend request
router.put('/requests/:id', tokenCheck, async (req, res) => {
  try {
    const { accepted } = req.body
    if (accepted === undefined || accepted === null) {
      return res.status(400).end()
    }
    // get friend request document
    const friendRequest = await db.FriendRequest.findById(req.params.id)
    // document not found
    if (!friendRequest) {
      console.log('request not found')
      return res.status(404).end()
    }
    // documents reciepient is not user
    if (friendRequest.to.toString() !== req.user.uid.toString()) {
      console.log('no match')
      console.log(friendRequest.to, req.user.uid)
      return res.status(401).end()
    }
    // update documents in database
    await db.FriendRequest.updateOne(
      { _id: req.params.id },
      { accepted, resolvedAt: Date.now(), closed: true }
    )
    // emit completed event
    const toSocketId = req.sockets[friendRequest.to]
    if (toSocketId) {
      req.io.to(toSocketId).emit('friendRequest')
    }
    const fromSocketId = req.sockets[friendRequest.from]
    if (fromSocketId) {
      req.io.to(fromSocketId).emit('friendRequest')
    }
    if (accepted) {
      await db.User.updateOne(
        { _id: friendRequest.to },
        { $push: { friends: friendRequest.from } }
      )
      await db.User.updateOne(
        { _id: friendRequest.from },
        { $push: { friends: friendRequest.to } }
      )
      if (toSocketId) {
        req.io.to(toSocketId).emit('friend')
      }
      if (fromSocketId) {
        req.io.to(fromSocketId).emit('friend')
      }
      res.json(friendRequest)
    } else {
      res.json({})
    }
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

module.exports = router
