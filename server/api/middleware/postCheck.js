const db = require('../models')

module.exports = async (req, res, next) => {
  if (!req.params.postId) {
    console.log(
      'postCheck middleware requires request url to have a parameters with names of postId and feedId'
    )
    return res.status(500)
  }
  const post = await db.Post.findById(req.params.postId)
  if (post.feed.toString() === req.params.feedId.toString()) {
    next()
  } else {
    console.log('DEFAULTING IN POSTCHECK')
    console.log('POST', JSON.stringify(post, null, 2))
    console.log('Feed', req.params.feedId)
    return res.status(400).end()
  }
}
