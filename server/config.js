require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5001,
  mongodbUri: process.env.MONGODB_URI,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  environment: process.env.NODE_ENV || 'development'
};
