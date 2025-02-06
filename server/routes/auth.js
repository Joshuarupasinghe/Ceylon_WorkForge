const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, company, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ firstName, lastName, email, password, company, role });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, user: { id: user._id, email, role } });
  } catch (error) {
    console.error('Error:', error); // This logs the full error in your terminal
    res.status(500).json({ message: 'Server error', error: error.message }); // Send the actual error message back to Postman
  }
  
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user._id, email, role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signup', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ message: 'Database connection not ready' });
  }
  // ... rest of your signup code
});

module.exports = router;