const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/first-routes');

const app = express();
require('./db/index');

app.use(express.json());
app.use(cors());
app.use('/api/tasks', taskRoutes);

app.listen(8008, () => {
  console.log('Server running on http://localhost:8008');
});
