const db = require('../models');

module.exports = async (req, res, next) => {
  const user = await db.User.findById(req.user.uid);
  if (user.friends.includes()) res.status(403).end();
};
