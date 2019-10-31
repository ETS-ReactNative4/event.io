const router = require('express').Router();
const db = require('../models');
const jwtCheck = require('../middleware/jwtCheck');

router.get('/', jwtCheck, async (req, res) => {
  try {
    const user = await db.User.findById(req.user.uid).select('username email picture friends');
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

router.get('/:id', jwtCheck, async (req, res) => {
  try {
    const user = await db.User.findById(req.user.uid);
    const isFriend = user.friends.includes(req.params.id);

    const other = isFriend
      ? await db.User.findById(req.params.id)
          .populate('friends', '-email -password')
          .select('-email -password')
      : await db.User.findById(req.params.id)
          .populate('friends', '-email -password -friends')
          .select('-email -password');
    res.json(other);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
