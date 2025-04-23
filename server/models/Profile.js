const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', ''],
    required: true 
  },
  contactNumber: { 
    type: String,
    match: /^\+?[0-9]{7,15}$/,
    required: true
  },
  education: { 
    type: String,
    required: true
  },
  field: { 
    type: String,
    required: true 
  },
  certificates: { 
    type: String 
  },
  service: { 
    type: String,
    required: true
  },
  subCategory: { 
    type: String 
  },
  specialNotes: { 
    type: String 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

ProfileSchema.index({ user: 1 }, { unique: true });

const ProfileModel = mongoose.model('Profile', ProfileSchema);
module.exports = ProfileModel;