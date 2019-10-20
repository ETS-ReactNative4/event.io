const db = require('../models');

module.exports = function(app) {
  app.get('/api/posts', async (req, res) => {
    const posts = await db.Post.find().populate('User');
    res.json(posts);
  });

  app.post('/api/posts', async (req, res) => {
    const { post } = req.body;
    const createdPost = await db.Post.create(post);
    res.json(createdPost);
  });
};
