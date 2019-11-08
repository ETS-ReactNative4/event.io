/*
  GET /posts => returns all requester's posts
  POST /posts => creates a post for requester

  POST /posts/:id => post child to post with id
  GET /posts/:id => returns requester's post with id

  GET /posts/:id/likes => returns other users posts
  POST /posts/:id/likes =>
*/
const router = require('express').Router()
const db = require('../models')
const tokenCheck = require('../middleware/jwtCheck')

// get users post
router.get('/', tokenCheck, async (req, res) => {
  try {
    const posts = await db.Post.find({ user: req.user.uid, parent: null }).populate(
      'user',
      '-email, -password'
    )
    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

// Create a post
router.post('/', tokenCheck, async (req, res) => {
  try {
    const { body, public } = req.body
    const post = await db.Post.create({
      user: req.user.uid,
      body,
      public
    })
    post.populate('user', (err, doc) => {
      const socketId = req.sockets[req.user.uid]
      if (socketId) {
        req.io.to(socketId).emit('post')
      }
      res.json(doc)
    })
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

router.get('/:id', tokenCheck, async (req, res) => {
  try {
    const post = await db.Post.findById(req.params.id).populate('user', '-email -password')
    res.json(post)
  } catch (err) {
    res.status(500).end()
  }
})

// add child to post
router.post('/:id', tokenCheck, async (req, res) => {
  try {
    const { body, public } = req.body
    const post = await db.Post.create({
      parent: req.params.id,
      user: req.user.uid,
      body,
      public
    })
    const updatedPost = await db.Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { children: post.id } },
      { new: true }
    ).populate('user')
    res.status(201).json(updatedPost)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

// get likes for secific posts
router.get('/:id/likes', tokenCheck, async (req, res) => {
  try {
    const post = await db.Post.findById(req.params.id).populate('likes', '-email -password')
    res.json({ likes: post.likes })
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

// post like
router.post('/:id/likes', tokenCheck, async (req, res) => {
  try {
    const { like } = req.body
    const post = like
      ? await db.Post.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { likes: req.user.uid } },
          { new: true }
        ).populate('user', '-email -password')
      : await db.Post.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { likes: req.user.uid } },
          { new: true }
        ).populate('user', '-email -password')
    res.json(post)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

module.exports = router
