// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // MongoDB connection
const taskRoutes = require('./routes/first-routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8008;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Task Manager API is live');
});
app.use('/api/tasks', taskRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
