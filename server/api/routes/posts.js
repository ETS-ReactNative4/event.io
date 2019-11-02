/*
  GET /posts => returns all requester's posts
  POST /posts => creates a post for requester

  GET /posts/:id => returns requester's post with id
  GET /posts/user/:id => returns other users posts
  GET /posts/user/:id/:postid => returns other users post with id

  POST /posts/:id/comments
  POST /posts/:id/likes
*/

const router = require('express').Router();
const db = require('../models');
const tokenCheck = require('../middleware/jwtCheck');

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

// post comments
router.post('/:id/comments', tokenCheck, async (req, res) => {
  const { body } = req.body;
  try {
    const comment = await db.Comment.create({ body, user: req.user.uid });
    const updatedPost = await db.Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comments: comment.id } }
    );
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// get like
router.get('/:id/likes', tokenCheck, async (req, res) => {
  try {
    const post = await db.Post.findById(req.params.id).populate('likes', '-email -password');
    res.json({ likes: post.likes });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// post like
router.post('/:id/likes', tokenCheck, async (req, res) => {
  try {
    const { like } = req.body;
    if (like) {
      const post = await db.Post.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { likes: req.user.uid } }
      );
      res.json(post);
    } else {
      const post = await db.Post.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { likes: req.user.uid } }
      );
      res.json(post);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// post reply
router.post('/:id/comments/:commentId', tokenCheck, async (req, res) => {
  res.status(501).end();
});

module.exports = router;
