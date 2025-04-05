require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/first-routes');

const app = express();
require('./db/index');
const port = process.env.PORT || 8008;

app.use(express.json());
app.use(cors());
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log('Server running on http://localhost:8008');
});
