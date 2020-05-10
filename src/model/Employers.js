const mongoose = require('mongoose');

const employersSchema = new mongoose.Schema({

  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('Employers', employersSchema);
