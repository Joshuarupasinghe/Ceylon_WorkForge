// Backend route handler (Express)
// routes/profile.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      gender,
      contactNumber,
      education,
      field,
      certificates,
      service,
      subCategory,
      specialNotes,
      profileImage
    } = req.body;

    // Build profile object
    const profileFields = {
      user: req.user.id, // Assuming auth middleware sets req.user
      gender,
      contactNumber,
      education,
      field,
      certificates,
      service,
      subCategory,
      specialNotes,
      profileImage,
      updatedAt: Date.now()
    };

    // Check if profile exists
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create new profile
    profile = new Profile(profileFields);
    await profile.save();
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;