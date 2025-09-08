const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yourDBname')
  .then(() => {
    console.log('MongoDB connected using Mongoose');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
