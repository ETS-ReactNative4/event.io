const router = require('express').Router()
const db = require('../models')
const tokenCheck = require('../middleware/tokenCheck')
const feedCheck = require('../middleware/feedCheck')
const postCheck = require('../middleware/postCheck')
const mapService = require('../utils/mapService')

// Get Feeds
router.get('/', tokenCheck, async (req, res) => {
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
      .populate('user', '-email -password')
      .sort({ _id: -1 })
      .limit(25)
    res.json(feeds)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

// Create Feed
router.post('/', tokenCheck, async (req, res) => {
  try {
    const { location, audience, title, description } = req.body
    mapService.geocodeReverse(location, async mapquestData => {
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

// Get Feed and Posts
router.get('/:feedId', tokenCheck, feedCheck, async (req, res) => {
  try {
    const feed = await db.Feed.findById(req.params.feedId).populate(
      'user',
      '-email -password'
    )
    const posts = await db.Post.find({
      _id: { $in: feed.posts }
    }).populate('user', '-email -password')
    res.json({ feed, posts })
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

// Post to a feed
router.post('/:feedId', tokenCheck, feedCheck, async (req, res) => {
  try {
    const { body } = req.body
    const post = await db.Post.create({
      user: req.user.uid,
      feed: req.params.feedId,
      body
    })
    const updatedFeed = await db.Feed.findByIdAndUpdate(
      req.params.feedId,
      { $push: { posts: post.id } },
      { new: true }
    ).populate('user', '-email -password')

    post.populate('user', '-email -password', (err, doc) => {
      if (err) throw err
      res.status(201).json({ feed: updatedFeed, post: doc })
    })
  } catch (err) {
    res.status(500).end()
  }
})

// get a specific post
router.get(
  '/:feedId/:postId',
  tokenCheck,
  feedCheck,
  postCheck,
  async (req, res) => {
    try {
      const { postId } = req.params
      const post = await db.Post.findById(postId).populate(
        'user',
        '-email -password'
      )
      const comments = await db.Post.find({
        _id: { $in: post.comments }
      }).populate('user', '-email -password')

      res.json({ post, comments })
    } catch (err) {
      console.log(err)
      res.status(500).end()
    }
  }
)

// Post a comment
router.post(
  '/:feedId/:postId',
  tokenCheck,
  feedCheck,
  postCheck,
  async (req, res) => {
    try {
      const { postId, feedId } = req.params
      const { body } = req.body
      const post = await db.Post.create({
        user: req.user.uid,
        parent: postId,
        feed: feedId,
        body: body
      })
      // no await is fine here
      const parent = await db.Post.findByIdAndUpdate(
        postId,
        {
          $push: { comments: post._id }
        },
        { new: true }
      ).populate('user', '-email -password')
      post.populate('user', '-email -password', (err, doc) => {
        if (err) throw err
        res.json({ parent, post: doc })
      })
    } catch (err) {
      console.log(err)
      res.status(500).end()
    }
  }
)

module.exports = router
