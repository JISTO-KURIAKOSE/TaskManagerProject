const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/taskmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

module.exports = mongoose;
