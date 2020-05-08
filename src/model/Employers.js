const mongoose = require('mongoose');

const employersSchema = new mongoose.Schema({

  address: {
    type: String,
    min: 5,
    max: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('Employers', employersSchema);
