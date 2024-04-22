const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

const itemsRoutes = require('./routes/items');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const mongoUri = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define routes
app.use('/api/items', itemsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// const express = require('express');
// const { MongoClient } = require('mongodb');
// require('dotenv').config(); // Load environment variables from .env file
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 4000;

// const itemsRoutes = require('./routes/items');

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection URI
// const uri = process.env.MONGODB_URI;

// // Create a new MongoDB client
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Connect to MongoDB
// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }

// // Define routes
// app.use('/api/items', itemsRoutes);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   connectToMongoDB(); // Connect to MongoDB when server starts
// });
