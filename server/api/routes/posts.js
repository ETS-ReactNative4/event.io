const router = require('express').Router();
const db = require('../models');
const jwtCheck = require('../middleware/jwtCheck');

router.get('/', jwtCheck, async (req, res) => {
  const posts = await db.Post.find({ user: req.user.uid }).populate('user');
  res.json(posts);
});

router.post('/', jwtCheck, async (req, res) => {
  const { body, title } = req.body;
  const post = await db.Post.create({
    user: req.user.uid,
    body,
    title
  });
  res.json(post);
});

module.exports = router;
