const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config');
const authRoutes = require('./routes/auth');

dotenv.config(); // Load .env variables
connectDB();     // Establish MongoDB connection

const app = express();
app.use(express.json());
app.use(cors());

// Routes
// app.get('/', (req, res) => {
//   res.send('Backend is running');
// });
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});