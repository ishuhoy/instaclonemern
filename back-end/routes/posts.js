const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name profilePic').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { caption, image } = req.body;
    const post = new Post({ user: req.userId, caption, image });
    await post.save();
    await post.populate('user', 'name profilePic');
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.userId;
    
    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    
    await post.save();
    await post.populate('user', 'name profilePic');
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
