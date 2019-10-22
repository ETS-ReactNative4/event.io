const router = require('express').Router();
const db = require('../models');
const jwtCheck = require('../middleware/jwtCheck');

router.get('/', jwtCheck, async (req, res, next) => {
  const friends = db.Friends.find({ user: req.user.uid }).populate('user');
  res.json(friends);
});

router.get('/requests', jwtCheck, (req, res) => {
  const friendRequests = db.FriendRequest.find({ user: req.user.uid }).populate('user');
});

router.post('/requests', jwtCheck, (req, res) => {
  const { to } = req.body;
  db.FriendRequest.create({ to, from: req.user.uid, accepted: false });
});

module.exports = router;
