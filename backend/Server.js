const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db'); // MongoDB connection
const taskRoutes = require('./routes/first-routes');

const app = express();
const port = process.env.PORT || 8008;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
