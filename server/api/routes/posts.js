const router = require('express').Router();
const db = require('../models');
const tokenCheck = require('../middleware/jwtCheck');

/*
  GET /posts => returns all users posts
  GET /posts/:id => returns users post with id
  GET /posts/user/:id => returns other users posts
  GET /posts/user/:id/:postid => returns other users post with id
*/

// get all of request users posts
router.get('/', tokenCheck, async (req, res) => {
  try {
    const posts = await db.Post.find({ author: req.user.uid }).populate(
      'author',
      '-email, -password'
    );
    res.json(posts);
  } catch (err) {
    res.status(500).end();
  }
});

// get all of other users posts
router.get('/user/:id', tokenCheck, async (req, res) => {
  try {
    const asker = await db.User.findById(req.user.uid);
    const isFriend = asker.friends.includes(req.params.id);
    const posts = isFriend
      ? await db.Post.find({ user: req.params.id })
      : await db.Post.find({ user: req.params.id, public: true });
    res.json(posts);
  } catch (err) {
    res.status(500).end();
    console.log(err);
  }
});

// create post
router.post('/', tokenCheck, async (req, res) => {
  try {
    const { body, title, public } = req.body;
    console.log(body, title);
    const post = await db.Post.create({
      author: req.user.uid,
      body,
      title,
      public
    });
    const socketId = req.sockets[req.user.uid];
    if (socketId) {
      req.io.to(socketId).emit('post');
    }
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

module.exports = router;
