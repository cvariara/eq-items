const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const itemsRoutes = require('./routes/items');

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

// Define routes
app.use('/api/items', itemsRoutes);

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    server.listen(PORT, () => {
      console.log('Connected to DB');
      console.log(`Listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });