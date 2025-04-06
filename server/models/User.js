const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: { type: String },
    role: { type: String, enum: ['freelancer', 'client'], default: 'client' },
    googleId: { type: String, sparse: true }, // Added for Google OAuth
    profilePicture: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Hash Password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);