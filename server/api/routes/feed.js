const router = require('express').Router();
const tokenVerification = require('../middleware/jwtCheck');
const db = require('../models');

router.get('/', tokenVerification, async (req, res) => {
  try {
    // get user and friends posts;
    const user = await db.User.findById(req.user.uid);
    const friends = user.friends;
    friends.push(req.user.uid);
    // if possible one query
    // friends []  to obj of $eq: friend[0]
    const posts = await db.Post.find({ user: { $in: friends }, parent: null })
      .populate('user', '-email -password')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

module.exports = router;
