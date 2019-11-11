const db = require('../models');
module.exports = async function feedVerification(req, res, next) {
  // assume feed id is req.params.feedId
  try {
    const feed = await db.Feed.findById(req.params.feedId).populate('user', '-email -password');
    switch (feed.audience) {
      case 'public': {
        next();
        return;
      }
      case 'friends': {
        if (
          feed.user._id.toString() === req.user.uid.toString() ||
          feed.user.friends.includes(req.user.uid)
        ) {
          next();
        } else {
          res.status(401).end();
        }
        return;
      }
      case 'invite': {
        if (feed.invites.includes(req.user.uid)) {
          next();
        } else {
          res.status(401).end();
        }
        return;
      }
      default:
        res.status(400).end();
    }
  } catch (err) {
    console.log('Error::FeedVerification', err);
    res.status(500).end();
  }
};
