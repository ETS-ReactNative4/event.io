const router = require('express').Router();
const tokenVerification = require('../middleware/jwtCheck');
const db = require('../models');

/*
 By default returns latest
 query parameter can be specified to retrieve items less than post id
*/
router.get('/', tokenVerification, async (req, res) => {
  try {
    const lastIndex = req.query.index;
    const user = await db.User.findById(req.user.uid);
    const friends = user.friends;
    friends.push(req.user.uid);

    const posts = await db.Post.find({ user: { $in: friends }, parent: null })
      .populate('user', '-email -password')
      .sort({ _id: -1 }) // sort by latest
      .limit(25); // limit to 25

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

module.exports = router;
