const express   = require('express');
const cors      = require('cors');
const mongoose  = require('mongoose');
const passport  = require('passport');
const path      = require('path');
const config    = require('./config');
const authRoutes     = require('./routes/auth');
const profileRoutes  = require('./routes/profile');
const CategoryRoutes = require('./routes/CategoryRoutes');
const ServiceRoutes  = require('./routes/ServiceRoutes');

const app = express();


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/categories', express.static(path.join(__dirname, 'uploads/categories')));


if (config.environment === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}


app.use('/auth',           authRoutes);
app.use('/api/profile',    profileRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/services',   ServiceRoutes);


app.get('/', (req, res) => res.send('Server is running'));
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: config.environment === 'development' ? err.message : 'Internal server error'
  });
});


mongoose.connect(config.mongodbUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
