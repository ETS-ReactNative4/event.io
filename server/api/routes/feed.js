const router = require('express').Router()
const tokenVerification = require('../middleware/jwtCheck')
const feedVerification = require('../middleware/feedVerification')
const db = require('../models')
const mapService = require('../utils/mapService')

// Get Feeds
router.get('/', tokenVerification, async (req, res) => {
  try {
    const user = await db.User.findById(req.user.uid)
    const { friends } = user
    friends.push(user.id)
    const feeds = await db.Feed.find({
      $or: [
        {
          audience: 'public'
        },
        {
          user: { $in: friends },
          audience: 'friends'
        },
        {
          user: { $in: friends },
          audience: 'invite',
          invites: req.user.uid
        }
      ]
    })
      .populate('user posts', '-email -password')
      .sort({ _id: -1 })
      .limit(25)
    res.json(feeds)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

// Create Feed
router.post('/', tokenVerification, async (req, res) => {
  try {
    const { location, audience, title, description } = req.body
    mapService.geocodeReverse(location, async mapquestData => {
      console.log(mapquestData)
      const feed = await db.Feed.create({
        user: req.user.uid,
        location,
        address: mapquestData.street,
        audience,
        title,
        description
      })
      feed.populate('user', (err, doc) => {
        if (err) {
          res.status(500).end()
        } else {
          res.status(201).json(doc)
        }
      })
    })
  } catch (err) {
    res.status(500).end()
  }
})

router.get('/:feedId', tokenVerification, feedVerification, async (req, res) => {
  try {
    const feed = await db.Feed.findById(req.params.feedId).populate('user')
    const posts = await db.Post.find({ _id: { $in: feed.posts } }).populate('user')
    res.json({ feed, posts })
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

// Post to a feed
router.post('/:feedId', tokenVerification, feedVerification, async (req, res) => {
  try {
    const { body } = req.body
    const post = await db.Post.create({
      user: req.user.uid,
      body
    })
    const updatedFeed = await db.Feed.findByIdAndUpdate(
      req.params.feedId,
      { $push: { posts: post.id } },
      { new: true }
    )
    res.status(201).json(updatedFeed)
  } catch (err) {
    res.status(500).end()
  }
})

// Post a comment to a post in feed
router.post('/:feedId/:postId', tokenVerification, feedVerification, async (req, res) => {
  const { body } = req.body
  try {
    const comment = await db.Comment.create({
      body,
      user: req.user.uid
    })
    const post = await db.Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: comment.id }
    })
    res.status(201).json(post)
  } catch (err) {
    res.status(500).end()
  }
})

// Post a reply to a comment
router.post(':feedId/:postId/:commentId', tokenVerification, feedVerification, async (req, res) => {
  try {
    const { body } = req.body
    const reply = await db.Comment.create({
      body,
      user: req.user.uid,
      parent: req.params.commentId
    })
    const updatedComment = await db.Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        $push: { replies: reply.id }
      },
      { new: true }
    )
    res.status(201).json(updatedComment)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

module.exports = router
