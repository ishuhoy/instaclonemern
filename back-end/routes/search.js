// routes/search.js (or add into auth.js)
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const q = req.query.q || '';
    const users = await User
      .find({ name: { $regex: q, $options: 'i' } }) // case‑insensitive
      .select('name email profilePic');             // limit fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
