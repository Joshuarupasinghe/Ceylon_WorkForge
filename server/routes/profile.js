const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const Profile = require('../models/Profile');

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth, upload.single('profileImage'), async (req, res) => {
  try {
    const {
      gender,
      contactNumber,
      education,
      field,
      certificates,
      service,
      subCategory,
      specialNotes
    } = req.body;

    // Build profile object
    const profileFields = {
      user: req.user.id,
      gender,
      contactNumber,
      education,
      field,
      certificates,
      service,
      subCategory,
      specialNotes,
      updatedAt: Date.now()
    };

    // Add profile image path if a file was uploaded
    if (req.file) {
      profileFields.profileImage = `/uploads/profiles/${req.file.filename}`;
    }

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

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;