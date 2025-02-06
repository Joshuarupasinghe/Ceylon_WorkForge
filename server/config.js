const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

const uri = process.env.MONGO_URI; // Use MONGO_URI from .env file

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect(); // Connect the client to the server
    console.log(`MongoDB connection established successfully`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
}

module.exports = connectDB;
