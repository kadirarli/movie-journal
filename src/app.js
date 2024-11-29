const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

//Middleware
app.use(bodyParser.json());

// Basic test route
app.get('/', (req, res)     => {
    res.send('Movie Journal API is running!');
});

// MongoDB connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed', error);
  }
};

// Start the server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

const movieRoutes = require('./routes/MovieRoutes');
app.use('/api/movies', movieRoutes);

module.exports = app;